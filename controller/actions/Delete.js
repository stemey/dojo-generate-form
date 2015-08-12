define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/when",
	"./_ActionMixin",
	"dojo/i18n!../../nls/messages"

], function (declare, lang, when, _ActionMixin, messages) {
// module:
//		gform/controller/actions/Delete


	return declare([_ActionMixin], {
		// summary:
		//		Deletes the entity. Afterwards the editor is either closed or reused to create a new entity.
		messageModule: "actions.delete",
		execute: function () {
			if (this.state !== "create") {
				this.ctrl.startConfirmDialog(messages["actions.deleteDialog"], lang.hitch(this, "_onDelete"));
			}
		},
		createButton: function () {
			var button = this.inherited(arguments);
			var ctrl=this.ctrl;
			var stateChange = function () {
				if (ctrl.get("state") === "create") {
					button.set("disabled", true);
				} else {
					button.set("disabled", false);
				}
			};
			stateChange();
			ctrl.watch("state", stateChange);
			return button;
		},
		_onDelete: function (ok) {
			if (ok) {
				var entity = this.ctrl.editor.get("plainValue");
				this.ctrl.editor.reset();
				this.ctrl._removeChangeIndicator();
				this.ctrl.showProgressBar("deleting " + this.ctrl.editor.getLabel());
				var idProperty = this.ctrl.store.idProperty;
				when(this.ctrl.store.remove(entity[idProperty],{old:entity}))
					.then(lang.hitch(this, "_onRemoved"))
					.otherwise(lang.hitch(this, "_onRemoveFailed"));
			}
		},
		_onRemoved: function () {
			this.ctrl.hideProgressBar();
			if (this.ctrl.close) {
				this.ctrl.close();
			} else {
				this.ctrl.editor.setPlainValue({});
				this.ctrl.set("state", "create");
			}


		},
		_onRemoveFailed: function () {
			this.ctrl.hideProgressBar();
			this.ctrl.set("state", "edit");
			this.ctrl.alert(messages["actions.delete.serverError"]);
		}
	});
});
