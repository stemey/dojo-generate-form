define(['dojo/_base/lang',
    "dojo/_base/declare"
], function (lang, declare) {

    return declare("gform-app.group.tree.TreeToolMixin", [], {
        tree: null,
        postCreate: function () {
            this.own(this.tree.watch("selectedItem", lang.hitch(this, "onItemChanged")));
            this.inherited(arguments);
        },
        getSelectedItem: function () {
            return this.tree.get("selectedItem");
        },
        onItemChanged: function () {
        }
    });

});
