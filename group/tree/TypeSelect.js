define([
    'dijit/form/Select',
    './TreeToolMixin',
    "dojo/_base/declare"
], function (Select, TreeToolMixin, declare) {


    return declare("gform-app.group.tree.TypeSelect", [Select, TreeToolMixin], {
        postCreate: function () {
            this.inherited(arguments);
            this.own(this.watch("value", this.onSelectChanged.bind(this)));
        },
        onSelectChanged: function () {
            this.getSelectedItem().setType(this.get("value"));
            // force rerender of editor by focussing again
            this.tree.dndController.setSelection(this.tree.dndController.getSelectedTreeNodes());
        },
        onItemChanged: function () {
            var item = this.getSelectedItem();
            if (!this.getSelectedItem()) {
                this.set("disabled", true);
                return;
            }
            if (typeof this.getSelectedItem().getTypeOptions === "function") {
                this.set("disabled", false);
                var value = this.getSelectedItem().getType();
                this.set("options", this.getSelectedItem().getTypeOptions());
                this.set("value",value);
            } else {
                this.set("disabled", true);

            }
        }
    });

});
