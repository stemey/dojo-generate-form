define([
	"dojo/_base/declare",
	"dojo/_base/lang",
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
	"dijit/Dialog"
], function(declare, lang, domClass, when, editorSchema, Editor, createEditorFactory, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){


	
return declare("gform.tests.gridx.EditorController", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		baseClass : "gformEditorController",
		templateString : template,
		store: null,
		state:"create",
		currentId:100,
		postCreate : function() {	
			this.editor.set("editorFactory",createEditorFactory());
			this.editor.setMetaAndPlainValue(dojo.fromJson(editorSchema), {});
			this.watch("state",lang.hitch(this,"_onStateChange"));
			this.editor.on("value-changed",lang.hitch(this,"_onStateChange"));
			//this.editor.on("valid-change",lang.hitch(this,"_onStateChange"));
		},
		_onStateChange: function(e) {
			this.discardButton.set("disabled",!this.editor.hasChanged());
			this.deleteButton.set("disabled",this.state=="create");
			this.stateElement.innerHTML=this.get("state")=="create"?'New':'Edit';
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
			this.editor.reset();			
		},
		_edit: function(id) {
			this.set("state","edit");
			when(this.store.get(id),lang.hitch(this,"_onLoaded"),lang.hitch(this,"_onLoadFailed"));
		},
		_onLoaded: function(entity) {
			this.editor.set("plainValue", entity);
		},
		_onLoadFailed: function(error) {
			alert("error while loading entity");
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
			this.editor.set("plainValue", {id:this.currentId++});
		},
		save: function() {
			var entity = this.editor.get("plainValue");
			if (this.state==	"create") {
				this.store.add(entity);
				this.set("state","edit");
			}else{
				this.store.put(entity);
			}
			// reset editor to remove change indicators
			this.editor.set("plainValue",entity);
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
				this.store.remove(entity.id).then(lang.hitch(this,"_onRemoved"));
			}
		},
		_onRemoved: function() {
			alert("successfully removed");
		},
		_onRemoveFailed: function() {
			alert("removal failed");
		}
	});


});
