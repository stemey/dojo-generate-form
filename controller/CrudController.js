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
  "dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./crudController.html",
	"../schema/labelHelper",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
], function(declare, lang, array, domClass, request, all, when, Editor, createEditorFactory, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, labelHelper, domStyle, domGeometry	){


	
return declare( [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		baseClass : "gformEditorController",
		templateString : template,
		store: null,
		editorFactory:null,
		container:null,
		dialog:null,
		schema:null,
		state:"working",
		title:"Entity",	
		dialog: null,
		closing: false,
		title: null,
		postCreate : function() {	
			this.editor.set("editorFactory",this.editorFactory);
			this.editor.set("meta",this.schema);
			this.watch("state",lang.hitch(this,"_onStateChange"));
			this.editor.on("value-changed",lang.hitch(this,"_onStateChange"));
			
		},
		_onStateChange: function(e) {
			//this.discardButton.set("disabled",this.state=="working" || !this.editor.hasChanged());
			this.set("title", this.editor.getLabel());
			this.deleteButton.set("disabled",this.state=="working" || this.state=="create");
			//this.saveButton.set("disabled",this.state=="working" || (this.state=="edit" && !this.editor.hasChanged()));
			array.forEach(["create","edit","working"], function(e) {
				domClass.toggle(this.domNode,e,this.state==e);
			},this);
		},
		_checkState: function(callback) {
			var openDialog=false;
			if (this.state=="create" && this.editor.hasChanged()) {
				openDialog=true;
				this._startDialog("do you want to discard the new entity",callback);
			} else if (this.state=="edit" && this.editor.hasChanged()) {
				this._startDialog("do you want to discard the changes",callback);
				openDialog=true;
			}else if (callback) {
				callback(true);
			}
			return openDialog;
		},
		edit: function(id, schemaUrl) {
			this._checkState(lang.hitch(this,"_edit", id, schemaUrl));
		},
		discard: function() {
			if (!this.editor.hasChanged()) {
				alert("no changes to discard") 
			}else{
				this.editor.reset();	
			}		
		},
		_showProgressBar: function() {
			this.set("state","working");	
		},
		_edit: function(id, schemaUrl) {
			var instancePromise = this.store.get(id);
			if (schemaUrl) {
				var schemaPromise = request.get(schemaUrl, {handleAs: "json"});
				var promise = all([instancePromise, schemaPromise]);
				var me = this;
				this._execute(promise,"LoadForEditAndSchema");
			}else {
				var promise = instancePromise;
			this._execute(promise,"LoadForEdit");
			}
		},
		_onLoadForEdit: function(entity) {
			this.set("state","edit");
			this.editor.set("plainValue", entity);
		},
		_onLoadForEditFailed: function(error) {
			this.set("state","edit");
			alert("error while loading entity");
		},
		_onLoadForEditAndSchema: function(results) {
			this.set("state","edit");
			this.editor.setMetaAndPlainValue(results[1], results[0]);
			this.emit("editor-changed");
		},
		_onLoadForEditAndSchemaFailed: function(error) {
			this.set("state","edit");
			alert("error while loading entity");
		},
		_execute: function(promise, command) {
			if (!promise.isResolved()) {
				this._showProgressBar();
			}
			when(promise,lang.hitch(this,"_on"+command),lang.hitch(this,"_on"+command+"Failed"));
		},
		createNew: function(schemaUrl) {
			if (schemaUrl) {
				this._checkState(lang.hitch(this,"_createNewAndSchema", schemaUrl));
			} else {			
				if (this.state=="create") {
					this.editor.reset();
				}	else {
					this._checkState(lang.hitch(this,"_createNew"));
				}
			}
		},
		_createNew: function() {
			this.set("state","create");
			this.editor.set("plainValue", {});
		},
		_createNewAndSchema: function(schemaUrl) {
			var schemaPromise = request.get(schemaUrl, {handleAs: "json"});
			var me = this;
			this._execute(schemaPromise,"LoadForCreateAndSchema");
		},
		_onLoadForCreateAndSchema: function(schema) {
			this.set("state","create");
			this.editor.setMetaAndPlainValue(schema, {});
			this.emit("editor-changed");
		},
		_onLoadForCreateAndSchemaFailed: function(error) {
			this.set("state","create");
			alert("error while loading schema");
		},
		save: function() {
			var entity = this.editor.get("plainValue");
			if (this.state==	"create") {
				var promise = this.store.add(entity);
				this._execute(promise,"Add");
			}else{
				if (!this.editor.hasChanged()) {
					alert("no changes to save") 
				}else{
					var promise = this.store.put(entity);
					this._execute(promise,"Update");
				}
			}
		},
		_onAdd: function(result) {
			this.set("state","create");
			this.editor.reset();	
			this._removeChangeIndicator();
		},
		_removeChangeIndicator: function() {
			var entity = this.editor.get("plainValue");
			this.editor.set("plainValue",entity);
		},
		_onAddFailed: function(error) {
			this.set("state","create");
			alert("error while saving entity");
		},
		_onUpdate: function(result) {
			this._removeChangeIndicator();
			this.set("state","edit");
		},
		_onUpdateFailed: function(error) {
			this.set("state","edit");
			array.forEach(error.fields, function(error) {
				this.editor.addError(error.path, error.message);
			},this);
			alert("error while updating entity");
		},
		startup: function() {
			this.inherited(arguments);
			this._onStateChange();
		},
		_startDialog: function(message,callback) {
			this.dialog.show({message: message, callback: callback});
		},
		remove: function() {
			if (this.state!="create") {
				var entity = this.editor.get("plainValue");
				this._removeChangeIndicator();
				this.store.remove(entity.id).then(lang.hitch(this,"_onRemoved"));
			}
		},
		_onRemoved: function() {
			this.set("state","edit");
		},
		_onRemoveFailed: function() {
			this.set("state","edit");
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
		},
	});


});
