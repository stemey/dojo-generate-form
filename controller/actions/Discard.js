define([
	"dojo/_base/declare",
    "./_ActionMixin"

], function(declare, _ActionMixin){
// module:
//		gform/controller/actions/Discard

	
return declare( [_ActionMixin], {
	// summary:
	//		the editor's changes are removed.
	messageModule: "actions.discard",
	execute: function() {
			this.ctrl.editor.syncPendingChanges();
			this.ctrl.editor.reset();	
		}
	});
});
