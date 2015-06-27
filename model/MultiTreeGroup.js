define([
    '../schema/labelHelper',
    './MultiObject',
    "dojo/_base/declare"
], function (labelHelper, MultiObject, declare) {


    return declare("gform.model.MultiTreeGroup", [MultiObject], {
        getIconClass: function() {
            var group = this.getCurrentGroup();
            return group.getIconClass ? group.getIconClass() : group.schema.iconClass || "fa fa-cube";
        },
        removable: true,
        editorFactory:null,
        getChildNodes: function (item) {
            return this.getCurrentGroup().getChildNodes ? this.getCurrentGroup().getChildNodes(item) : null;
        },
        accept: function (model, position) {
            return this.getCurrentGroup().accept && this.getCurrentGroup().accept(model, position);
        },
        isRemovable: function () {
            return this.removable;
        },
        getLabel: function () {
            var group = this.getCurrentGroup();
            var label = labelHelper.getLabel(group.schema, group);
            label+=this.editorFactory.createBadge(this);
            return label;
        },
        /*setType: function (value) {
            this.set("currentTypeCode", value);
        },
        getType: function () {
            return this.get("currentTypeCode");
        },
        getTypeOptions: function () {
            return this.schema.groups.map(function (group) {
                return {value: group.code, label: group.code};
            });
        },*/
        removeSelf: function () {
            this.parent.remove(this);
        },
        hasChildNodes: function () {
            return this.getCurrentGroup().hasChildNodes && this.getCurrentGroup().hasChildNodes();
        },
        isAddable: function () {
            return this.getCurrentGroup().isAddable && this.getCurrentGroup().isAddable();
        },
        getDetailModel: function () {
            return this.getCurrentGroup().getDetailModel ? this.getCurrentGroup().getDetailModel() : this.getCurrentGroup();
        },
        getRoot: function () {
            return this;
        },
        addNew: function () {
            return this.getCurrentGroup().addNew();
        },
        add: function (item, index) {
            return this.getCurrentGroup().add(item, index);
        },
        remove: function (item) {
            return this.getCurrentGroup().remove(item);
        }


    });
});
