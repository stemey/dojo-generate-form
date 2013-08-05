define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/request",
	"dojo/promise/all",	
	"dojo/when",
	"gform/Editor",	
	"gform/createLayoutEditorFactory",	
	"./_CrudMixin",
  "dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/_Container",
	"dojo/text!./crudController.html",
	"../schema/labelHelper",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"./actions/Save",
	"./actions/Discard",
	"./actions/Delete",
	"./createActions",	
	"dojo/i18n!../nls/messages",
	"../layout/_InvisibleMixin", 	
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/ProgressBar",
	"dijit/Dialog",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
], function(declare, lang, array, domClass, request, all, when, Editor, createEditorFactory, _CrudMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container, template, labelHelper, domStyle, domGeometry, Save, Discard, Delete, createActions, messages, _InvisibleMixin, Button	){
// module:
//		gform/controller/CrudController

	
return declare( [   _CrudMixin,_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _InvisibleMixin ], {
	// summary:
	//		This crudController is a standalone CrudController that can be used in layout containers.
		baseClass : "gformEditorController",
		templateString : template,
		// actionContainer:
		//		the html element where the buttons go.
		actionContainer:null,
		// actionClasses: array
		//		an array of ActionClasses used to populate the actionCOntainer with buttons.
		actionClasses:[Save, Discard, Delete],
		constructor: function(props) {
			lang.mixin(this, props);
			this.inherited(arguments);
		},
		_onStateChange: function(e) {
			this.progressBar.hide();
			array.forEach(["create","edit","loading"], function(e) {
				domClass.toggle(this.domNode,e,this.state==e);
			},this);
		},
		showProgressBar: function(message) {
			this.progressBar.show();
			this.progressMessage.innerHTML=message; 
		},
		hideProgressBar: function() {
			this.progressBar.hide();
		},
		postCreate: function() {
			this.inherited(arguments);
			array.forEach(createActions(this.actionClasses, this), function(button) {
				this.actionContainer.containerNode.appendChild(button.domNode);
			}, this);
			
			this.watch("state", lang.hitch(this, "_onStateChange"));
			//this.editor.on("value-changed",lang.hitch(this,"_onValueChange"));
			this._onStateChange();
			this.on("editor-changed",lang.hitch(this,"_onEditorChange"));
		},
		_onEditorChange: function() {
			this.borderContainer.layout();
		},
		_onEditorChange: function() {
			this.borderContainer.layout();
		},	
		setEditorFactory: function(ef) {
			this.editor.set("editorFactory", ef);
		},

	});


});
