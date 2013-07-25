define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/json",
	"dojo/request",
	"dojo/promise/all",	
	"dojo/dom-class",
	"dojo/when",
	"../Editor",	
  "dojo/dom-class",
	"../createLayoutEditorFactory",	
	"../schema/labelHelper",
	"dijit/registry",
	"../controller/TabCrudController",	
	"dojo/store/JsonRest",
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog",
], function(declare, lang, array,json, request, all, domClass, when,  Editor,  domClass, createLayoutEditorFactory, labelHelper, registry, TabCrudController, Store){


	
return declare([], {
		tabContainer:null,
		storeRegistry:null,
		constructor: function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createSingle: function(options) {
			var props ={};
			var url = options.url;
			var store = this.storeRegistry.get(url, {target: url});
			props.closable=true;
			props.editorFactory=createLayoutEditorFactory();
			props.store=store;
			props.container= this.tabContainer;	
			props.dialog= this.confirmDialog;	
			var controller = new TabCrudController(props);
			this.tabContainer.addChild(controller);
			this.tabContainer.selectChild(controller);
			controller.createNew(options.schemaUrl, options.callback);
		},
		openSingle: function(options) {
			var wid ="tab_editor_"+options.url;
			var controller =registry.byId(wid);
			if (controller!=null) {
				this.tabContainer.selectChild(controller);
			} else {
				var props ={};
				var url = options.url.substring(0,options.url.lastIndexOf("/")+1)
				var id = options.url.substring(options.url.lastIndexOf("/")+1)
				var store = this.storeRegistry.get(url, {target: url});
				props.id=wid;
				props.closable=true;
				props.editorFactory=createLayoutEditorFactory();
				props.store=store;
				props.container= this.tabContainer;	
				props.dialog= this.confirmDialog;	
				var controller = new TabCrudController(props);
				this.tabContainer.addChild(controller);
				this.tabContainer.selectChild(controller);
				controller.edit(id, options.schemaUrl);
			}
		}
	});


});
