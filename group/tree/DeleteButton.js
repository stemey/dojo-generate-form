define([
    'dijit/form/Button',
    './TreeToolMixin',
    "dojo/_base/declare"
], function ( Button, TreeToolMixin,declare) {

    return declare("gform-app.group.tree.DeleteButton", [Button,TreeToolMixin], {
        onItemChanged: function () {
            if (!this.getSelectedItem()) {
                return;
            }
            this.set("disabled", typeof this.getSelectedItem().isRemovable === "function" ? !this.getSelectedItem().isRemovable() : false);
        },
        onClick: function () {
            var nodes = this.tree.dndController.getSelectedTreeNodes();
            nodes.forEach(function (node) {
                node.item.removeSelf ? node.item.removeSelf() : node.item.parent.remove(node.item);
                this.tree.model.onDelete(node.item);
            },this);
        }
    });

});
