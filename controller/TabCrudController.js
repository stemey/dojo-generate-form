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
	"dojo/text!./tabCrudController.html",
	"../schema/labelHelper",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"./actions/Save",
	"./actions/Discard",
	"./actions/Delete",
	"./createActions",	
	"dojo/i18n!../nls/messages",
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/ProgressBar",
	"dijit/Dialog",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
], function(declare, lang, array, domClass, request, all, when, Editor, createEditorFactory, _CrudMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, labelHelper, domStyle, domGeometry, Save, Discard, Delete, createActions, messages, Button	){


	
return declare( [  _CrudMixin,_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
		baseClass : "gformEditorController",
		templateString : template,
		container:null,
		actionContainer:null,
		closing: false,
		actionClasses:[Save, Discard, Delete],
		constructor: function(props) {
			lang.mixin(this, props);
			this.inherited(arguments);
		},
		_onValueChange: function(e) {
			this.set("title", this.editor.getLabel());
		},
		_onStateChange: function(e) {
			this.progressBar.hide();
			array.forEach(["create","edit","working","loading"], function(e) {
				domClass.toggle(this.domNode,e,this.state==e);
			},this);
		},
		showProgressBar: function(message) {
			//this.set("state","working");	
			this.progressBar.show();
			this.progressMessage.innerHTML=message; 
		},
		hideProgressBar: function() {
			//this.set("state","working");	
			this.progressBar.hide();
		},
		postCreate: function() {
			this.inherited(arguments);
			array.forEach(createActions(this.actionClasses, this), function(button) {
				this.actionContainer.containerNode.appendChild(button.domNode);
			}, this);
			this.watch("state", lang.hitch(this, "_onStateChange"));
			this.editor.set("editorFactory",this.editorFactory);
			this.editor.set("meta",{});
			this.editor.on("value-changed",lang.hitch(this,"_onValueChange"));
		},
		onClose: function() {
			// danger w. robinson: possibly endless recursion ahead
			if (this.closing) {
				// closing and discarding as confirmed in dialog
				return true;
			}
			this.closing=true;
			var me =this;
			var openDialog = this._checkState(function(close){
				if (close && openDialog)  {
					me.container.closeChild(me);
				} else {
					// closing was cancelled 
					me.closing = false;
				}
			});
			return !openDialog;
		},		
		resize: function(dim) {
			this.dim=dim;
			if (this.widget && this.widget.resize) {
				if (dim) {
					this.widget.resize({t:0,l:0,w:dim.w,h:dim.h});
				} else {
					this.widget.resize();
				}
			}
		},

	});


});
