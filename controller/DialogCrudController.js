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
	"dojo/text!./dialogCrudController.html",
	"../schema/labelHelper",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"./actions/Save",
	"./actions/Discard",
	"./actions/Delete",
	"./createActions",	
	"dojo/i18n!../nls/messages",
	"dijit/form/Button",
	"./ConfirmDialog",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
], function(declare, lang, array, domClass, request, all, when, Editor, createEditorFactory, _CrudMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, labelHelper, domStyle, domGeometry, Save, Discard, Delete, createActions, messages, Button	){


	
return declare( [  _CrudMixin,_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
		baseClass : "gformEditorController",
		templateString : template,
		actionContainer:null,
		actionClasses:[Save, Discard, Delete],
		constructor: function(props) {
			lang.mixin(this, props);
			this.inherited(arguments);
		},
		_onValueChange: function(e) {
			//this.set("title", this.editor.getLabel());
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
				this.actionContainer.appendChild(button.domNode);
			}, this);
			this.watch("state", lang.hitch(this, "_onStateChange"));
			//this.editor.set("editorFactory",this.editorFactory);
			//this.editor.set("meta",{});
			this.editor.on("value-changed",lang.hitch(this,"_onValueChange"));
			//aspects.after(this.editor, "", lang.hitch(this,"_onEditorChange"));
		},
		barHeight:null,
		fullMb:null,
		resize: function(dim) {
			if (!this.fullMb || this.fullMb.h==this.barHeight) {
				this.fullMb = domGeometry.getMarginBox(this.domNode);
				var editorMb = domGeometry.getMarginBox(this.editor.domNode);
				this.barHeight=  this.fullMb.h-editorMb.h;
				console.log("w : "+this.fullMb.w+" h: "+this.fullMb.h+" barh "+this.barHeight);
			}
			if ( dim ) {
				var editorDim={};
				if (dim.h<this.fullMb.h) {
					editorDim.h=dim.h-this.barHeight;
				} else {
					editorDim.h=this.fullMb.h-this.barHeight;
				}
				if (dim.w<this.fullMb.w) {
					editorDim.w=dim.w;	
				} else {
					editorDim.w=this.fullMb.w;
				}
				console.log("resize from "+dim.w+"  "+dim.h);
				console.log("resize to "+editorDim.w+"  "+editorDim.h);
				this.editor.resize(editorDim);
			}else if (this.fullMb && this.fullMb.h>this.barHeight){
					// +15 because of scrollbar issues.
					var editorDim={w:this.fullMb.w+15,h:this.fullMb.h-this.barHeight+15};
					console.log("resize x to "+editorDim.w+"  "+editorDim.h);
					this.editor.resize(editorDim);
			}
		},
		onCloseDialog: function(closeFn) {
			var me =this;
			var openDialog = this._checkState(function(confirmed){
				if (confirmed)  {
					me.editor.reset();
					closeFn();
				}
			});
		}
	});


});
