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
            this.set("disabled", typeof this.getSelectedItem().isAddable !== "function" ||  !this.getSelectedItem().isAddable());
        },
        onClick: function () {
            var nodes = this.tree.dndController.getSelectedTreeNodes();
            nodes.forEach(function (node) {
                if (node.item.addNew) {
                    node.item.addNew();
                    var childNodes = node.item.getChildNodes();
                    this.tree.model.onChildrenChange(node.item, childNodes);
                    var nodes = this.tree.getNodesByItem(childNodes[childNodes.length - 1]);
                    this.tree.dndController.setSelection(nodes)
                }
            }.bind(this));
        }
    });

});
