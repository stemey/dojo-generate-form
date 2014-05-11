define([
    "dojo/_base/declare",
    "./_ActionMixin"

], function (declare, _ActionMixin) {
// module:
//		gform/controller/actions/Discard


    return declare([_ActionMixin], {
        // summary:
        //		the editor's changes are removed.
        messageModule: "actions.close",
        createButton: function () {
            if (this.ctrl.close) {
                return this.inherited(arguments);
            } else {
                return null;
            }
        },
        execute: function () {
            var me = this;
            var dialog=this.ctrl._checkState(function (confirmed) {
                if (confirmed) {
                    me.ctrl.close();
                }
            });
            if (!dialog) {
                me.ctrl.close();
            }
        }
    });
});
