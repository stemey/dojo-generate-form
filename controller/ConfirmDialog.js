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
	"dojo/store/JsonRest",
  "dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./confirmDialog.html",
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog",
], function(declare, lang, array,json, request, all, domClass, when,  Editor,  domClass, createLayoutEditorFactory, labelHelper, registry, Store, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){


	
return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template,
		callback: null,
		dialogMessage: null,
		dialogYesButton: null,
		dialogNoButton: null,
		dialog: null,	
		postCreate: function() {
			this.dialogYesButton.on("click", lang.hitch(this, "confirm"));
			this.dialogNoButton.on("click", lang.hitch(this, "cancel"));
			this.dialog.on("close", lang.hitch(this, "onClose"));
		},
		show: function(options) {
			this.callback=options.callback;
			this.dialogMessage.innerHTML= options.message;
			this.dialog.show();
		},
		onClose: function() {
			this.callback(false);
			this.callback=null;
		},
		confirm: function() {
			this.callback(true);
			this.dialog.hide();
			this.callback=null;
		},
		cancel: function() {
			this.callback(false);
			this.dialog.hide();
			this.callback=null;
		}
	});


});
