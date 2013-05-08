define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/when",
	"dojo/text!./editorschema.json",
	"gform/Editor",	
	"gform/createLayoutEditorFactory",	
  "dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./editor.html",
	"dijit/form/Button",
	"dijit/layout/StackContainer",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"dijit/Dialog"
], function(declare, lang, array, domClass, when, editorSchema, Editor, createEditorFactory, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){


	
return declare("gform.tests.gridx.EditorController", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		baseClass : "gformEditorController",
		templateString : template,
		store: null,
		state:"create",
		postCreate : function() {	
			this.editor.set("editorFactory",createEditorFactory());
			this.editor.setMetaAndPlainValue(dojo.fromJson(editorSchema), {});
			this.watch("state",lang.hitch(this,"_onStateChange"));
			this.editor.on("value-changed",lang.hitch(this,"_onStateChange"));
		},
		_onStateChange: function(e) {
			//this.discardButton.set("disabled",this.state=="working" || !this.editor.hasChanged());
			this.deleteButton.set("disabled",this.state=="working" || this.state=="create");
			//this.saveButton.set("disabled",this.state=="working" || (this.state=="edit" && !this.editor.hasChanged()));
			array.forEach(["create","edit","working"], function(e) {
				domClass.toggle(this.domNode,e,this.state==e);
			},this);
		},
		_checkState: function(callback) {
			if (this.state=="create" && this.editor.hasChanged()) {
				this._startDialog("do you want to disacrd the new entity",callback);
			} else if (this.state=="edit" && this.editor.hasChanged()) {
				this._startDialog("do you want to disacrd the changes",callback);
			}else{
				callback(); 
			}
		},
		edit: function(id) {
			this._checkState(lang.hitch(this,"_edit", id));
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
		_edit: function(id) {
			var promise = this.store.get(id);
			this._execute(promise,"LoadForEdit");
		},
		_onLoadForEdit: function(entity) {
			this.set("state","edit");
			this.editor.set("plainValue", entity);
		},
		_onLoadForEditFailed: function(error) {
			this.set("state","edit");
			alert("error while loading entity");
		},
		_execute: function(promise, command) {
			if (!promise.isResolved()) {
				this._showProgressBar();
			}
			when(promise,lang.hitch(this,"_on"+command),lang.hitch(this,"_on"+command+"Failed"));
		},
		createNew: function() {
			if (this.state=="create") {
				this.editor.reset();
			}	else {
				this._checkState(lang.hitch(this,"_createNew"));
			}
		},
		_createNew: function() {
			this.set("state","create");
			this.editor.set("plainValue", {});
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
			this.set("state","edit");
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
			this.dialogMessage.innerHTML=message;
			this.dialogYesButton.on("click",callback);
			var dialog=this.dialog;
			this.dialogYesButton.on("click",function() {dialog.hide();});
			this.dialogNoButton.on("click",function() {dialog.hide();});
			this.dialog.show();
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
		}
	});


});
