define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/json",
	"dojo/aspect",
	"dojo/request",
	"dojo/promise/all",	
	"dojo/dom-class",
	"dojo/when",
	"../Editor",	
  "dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./singleEditorDialog.html",
	"dojo/dom-class",
	"../createLayoutEditorFactory",	
	"../schema/labelHelper",
	"../controller/DialogCrudController",
	"dojo/store/JsonRest",	
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog",
], function(declare, lang, array,json, aspect, request, all, domClass, when,  Editor,  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, domClass, createLayoutEditorFactory, labelHelper, DialogCrudController, Store){
//  module:
//		gform/opener/SingleEditorDialogOpener

	
return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		//  description:
		//		This dijit provides a dialog and an embedded CrudController. 

		templateString : template,
		//  storeRegistry:
		//		The storeRegistry used to access the resources handled by the editor.
		storeRegistry:null,
		startup: function() {
			var me = this;
			this.crudController.editor.set("editorFactory", createLayoutEditorFactory());
			this.crudController.dialog = this.confirmDialog;
			aspect.around(this.dialog, "hide", function(originalFn) {
				return lang.hitch(me, "onClose", originalFn);
			});	
		},
		onClose: function(originalFn) {
			var me = this;
			this.crudController.onCloseDialog(function() {
				originalFn.apply(me.dialog)
			});
		},
		openSingle: function(options) {
			//  description:
			//		open the dialog to edit an existing resource.
			//  options:
			//		must provide the schemaUrl to load the gform schema from. 
			//		Must also provide the url to the resource edited.
			var url = options.url.substring(0,options.url.lastIndexOf("/")+1)
			var id = options.url.substring(options.url.lastIndexOf("/")+1)

			var store = this.storeRegistry.get(url, {target: url});
			this.crudController.set("store", store);
			this.crudController.edit(id, options.schemaUrl);
			var me =this;
			this.dialog.on("editor-changed", function() {
				me.dialog.resize();
			});
			this.dialog.show();
		},
		createSingle: function(options) {
			//  description:
			//		open the dialog to create a new resource.
			//  options:
			//		must provide the schemaUrl to load the gform schema from. 
			//		Must also provide the url to the resource's collection. 
			//		A callback which gets passed the new id may also be specified.
			var url = options.url.substring(0,options.url.lastIndexOf("/")+1)
	
			var store = this.storeRegistry.get(url, {target: url});
			this.crudController.set("store", store);
			this.crudController.createNew(options.schemaUrl, options.callback);
			var me =this;
			this.dialog.on("editor-changed", function() {
				me.dialog.resize();
			});
			this.dialog.show();


		}
	});


});
