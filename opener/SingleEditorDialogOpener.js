define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./singleEditorDialog.html",
	"../createLayoutEditorFactory",
	"./ActionProgressBar",
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog"
], function (declare, lang, aspect, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, createLayoutEditorFactory, ActionProgressBar) {
// module:
//		gform/opener/SingleEditorDialogOpener


	return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		// summary:
		//		This dijit provides a dialog and an embedded CrudController. This dijit is designed o be used as opener in a gform/Context.

		templateString: template,
		controllerConfig: null,
		//  editorFactory:
		//		The editorFactory to use. If set will override the one passed to the openSingle/createSingle methods.
		editorFactory: null,
		//  storeRegistry:
		//		The storeRegistry used to access the resources handled by the editor.
		ctx: null,
		// dialog: dijit/Dialog
		//		the dialog holding the editor
		dialog: null,
		progressBar: null,
		progressMessage: null,
		// crudController: gform/controller/DialogCrudController
		//		the crudController to launch.
		crudController: null,
		startup: function () {
			var me = this;
			this.crudController.dialog = this.confirmDialog;
			lang.mixin(this.crudController, this.controllerConfig);
			this.crudController.setCtx(this.ctx);
            this.crudController.openerDialog=this.dialog;
            this.crudController.progressBar = new ActionProgressBar({progressBar: this.progressBar, progressMessage: this.progressMessage});
			aspect.around(this.dialog, "hide", function (originalFn) {
				return lang.hitch(me, "onClose", originalFn);
			});
		},

		onClose: function (originalFn) {
			var me = this;
			this.crudController.onCloseDialog(function () {
				originalFn.apply(me.dialog);
			});
		},
        _setCtxAttr: function(ctx) {
            this._set("ctx", ctx);
           this.crudController.setCtx(ctx);
        },
		openSingle: function (options) {
			// summary:
			//		open the dialog to edit an existing resource.
			//  options:
			//		must provide the schemaUrl to load the gform schema from.
			//		Must also provide the url to the resource edited.

			var url = options.url;
			var id = options.id;

			var store = this.ctx.getStore(url, {target: url, idProperty: options.idProperty || "id"});
			this.crudController.setEditorFactory(this.editorFactory || options.editorFactory || createLayoutEditorFactory());
			this.crudController.set("store", store);

            if (options.typeProperty) {
                this.crudController.editMulti(options.schemaUrls, options.typeProperty, id);
            }else{
                this.crudController.edit(id, options.schemaUrl);
            }

			var me = this;
			this.dialog.on("editor-changed", function () {
				me.dialog.resize();
			});
			return this.dialog.show();
		},
		createSingle: function (options) {
			// summary:
			//		open the dialog to create a new resource.
			//  options:
			//		must provide the schemaUrl to load the gform schema from.
			//		Must also provide the url to the resource's collection.
			//		A callback which gets passed the new id may also be specified.  Options may provide EditorFactory.
			var url = options.url;

			var store = this.ctx.getStore(url, {target: url});
			this.crudController.set("store", store);
			this.crudController.setEditorFactory(this.editorFactory || options.editorFactory || createLayoutEditorFactory());

            if (options.typeProperty) {
                this.crudController.createNewMulti(options.schemaUrls, options.typeProperty, options.callback, options.value);
            } else {
                this.crudController.createNew(options.schemaUrl, options.callback, options.value);
            }

			var me = this;
			this.dialog.on("editor-changed", function () {
				me.dialog.resize();
			});
			return this.dialog.show();


		}
	});


});
