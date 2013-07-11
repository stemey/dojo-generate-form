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
	"../controller/CrudController",
	"dojo/store/JsonRest",	
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog",
], function(declare, lang, array,json, aspect, request, all, domClass, when,  Editor,  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, domClass, createLayoutEditorFactory, labelHelper, CrudController, Store){


	
return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
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
			var url = options.url.substring(0,options.url.lastIndexOf("/")+1)
			var id = options.url.substring(options.url.lastIndexOf("/")+1)

			var store = this.storeRegistry.get(url, {target: url});
			this.crudController.set("store", store);
			this.crudController.edit(id, options.schemaUrl);
			var me =this;
			this.dialog.on("editor-changed", function() {
				me.dialog.resize();
				//me.dialog._position();
			});
			this.dialog.show();
		},
		createSingle: function(options) {
			var url = options.url.substring(0,options.url.lastIndexOf("/")+1)
			var id = options.url.substring(options.url.lastIndexOf("/")+1)

			var store = this.storeRegistry.get(url, {target: url});
			this.crudController.set("store", store);
			this.crudController.createNew(options.schemaUrl);
			var me =this;
			this.dialog.on("editor-changed", function() {
				me.dialog.resize();
				//me.dialog._position();
			});
			this.dialog.show();


		}
	});


});
