define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./_CrudMixin",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./crudController.html",
	"./actions/Save",
	"./actions/Discard",
	"./actions/Delete",
	"../layout/_InvisibleMixin",
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/ProgressBar",
	"dijit/Dialog",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"./ConfirmDialog"
], function (declare, lang, _CrudMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, Save, Discard, Delete, _InvisibleMixin) {

	return declare([   _CrudMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _InvisibleMixin ], {
		// summary:
		//		This crudController is a standalone CrudController that can be used in layout containers.
		baseClass: "gformEditorController",
		templateString: template,
		// actionContainer:
		//		the html element where the buttons go.
		actionContainer: null,
		// actionClasses: array
		//		an array of ActionClasses used to populate the actionCOntainer with buttons.
		actionClasses: [Save, Discard, Delete],
		constructor: function (props) {
			lang.mixin(this, props);
		},
		postCreate: function () {
			this.inherited(arguments);
			this.watch("state", lang.hitch(this, "_onStateChange"));
			//this.editor.on("value-changed",lang.hitch(this,"_onValueChange"));
			this._onStateChange();
			this.on("editor-changed", lang.hitch(this, "_onEditorChange"));
		},
		_onEditorChange: function () {
			this.borderContainer.layout();
		},
		setEditorFactory: function (ef) {
			this.editor.set("editorFactory", ef);
		}

	});


});
