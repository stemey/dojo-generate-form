define([
	"dojo/_base/declare",
	"dojo/_base/lang",
    "dojo/when",
	"./_ActionMixin",
	"dojo/i18n!../../nls/messages"

], function(declare, lang, when, _ActionMixin, messages	){
// module:
//		gform/controller/actions/Delete

	
	return declare( [_ActionMixin], {
		// summary:
		//		Deletes the entity. Afterwards the editor is cleared and can be used to create a new entity.
		messageModule: "actions.delete",
		execute: function() {
			if (this.state!="create") {
				var entity = this.ctrl.editor.get("plainValue");
				this.ctrl.editor.reset();
				this.ctrl._removeChangeIndicator();
				this.ctrl.showProgressBar("deleting "+this.ctrl.editor.getLabel());	
				when(this.ctrl.store.remove(entity.id))
					.then(lang.hitch(this,"_onRemoved"))
					.otherwise(lang.hitch(this,"_onRemoveFailed"));
			}
		},
		_onRemoved: function() {
			this.ctrl.editor.setPlainValue({});
			this.ctrl.set("state","create");
		},
		_onRemoveFailed: function() {
			this.ctrl.set("state","edit");
			this.ctrl.alert(messages["actions.delete.serverError"]);
		}
	});
});
