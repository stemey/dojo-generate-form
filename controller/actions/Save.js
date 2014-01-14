define([
	"dojo/_base/declare",
    "dojo/_base/array",
    "dojo/when",
	"./_ActionMixin",
	"dojo/i18n!../../nls/messages"

], function(declare, array, when, _ActionMixin, messages	){
// module:
//		gform/controller/actions/Save

	
return declare( [_ActionMixin], {
	// summary:
	//		Saves the entity. If the entity was persistent it will be update otherwise it will be inserted.
	messageModule: "actions.save",
	execute: function() {
		this.ctrl.editor.syncPendingChanges();
		var entity = this.ctrl.editor.get("plainValue");
		var message = "saving "+this.ctrl.editor.getLabel();
			if (this.ctrl.state === "create") {
				var errorCount = this.ctrl.editor.validate(true);
				if (errorCount===0) {
					this.ctrl.showProgressBar(message);
                    var idProperty = this.ctrl.store.idProperty;
                    delete entity[idProperty];
					var promise = this.ctrl.store.add(entity);
					this._execute(promise,"Add");
				}
			}else{
				if (!this.ctrl.editor.hasChanged()) {
					this.ctrl.alert(messages["actions.save.noChanges"]) ;
				}else{
					var errorCount = this.ctrl.editor.validate(true);
					if (errorCount==0) {	
						this.ctrl.showProgressBar(message);	
						var promise = this.ctrl.store.put(entity);
						this._execute(promise,"Update");
					}
				}
			}		
		},
		_onAdd: function(generatedId) {
			this.ctrl.hideProgressBar();	
			this.ctrl.set("state","edit");
			this.ctrl.editor.removeChangeIndicators();
			if (generatedId) {
				var me = this;
				var entity = this.ctrl.store.get(generatedId);	
				when(entity).then(function(e) {
					me.ctrl.editor.setPlainValue(e);
					me.ctrl.onCreated(generatedId);
				});
			} else {
				var idProperty = this.ctrl.store.idProperty  || "id";
				this.ctrl.onCreated(this.editor.getPlainValue()[idProperty]);
			}
			//this.ctrl.editor.set("plainValue",{});
			//this.ctrl.editor.reset();	
			this.ctrl.editor.removeChangeIndicators();
		},
		_onAddFailed: function(error) {
			this.ctrl.hideProgressBar();	
			this.ctrl.set("state","create");
			this.ctrl.alert(messages["actions.save.serverError"]);
		},
		_onUpdate: function(result) {
			this.ctrl.hideProgressBar();	
			//this.ctrl._removeChangeIndicator();
			this.ctrl.editor.removeChangeIndicators();
			//this.ctrl.editor.reset();	
			this.ctrl.set("state","edit");
		},
		_onUpdateFailed: function(error) {
			this.ctrl.hideProgressBar();	
			this.ctrl.set("state","edit");
			array.forEach(error.fields, function(error) {
				this.ctrl.editor.addError(error.path, error.message);
			},this);
			this.ctrl.alert(messages["actions.save.serverError"]);
		}
	});
});
