define([
    "../../model/AbstractMappedSelectModel",
    "dojo/_base/declare",
    "./GroupTransformer",
    "dojo/aspect"
], function (AbstractMappedSelectModel, declare, GroupTransformer, aspect) {

    return declare("gform.model.AttributeSelectModel", [AbstractMappedSelectModel], {
        attributesModel: null,
        mappedAttribute: null,
        transformer: null,
        constructor: function () {
            this.transformer = new GroupTransformer();
        },
        startListening: function (parent, cb) {
            while (parent && !parent.form) {
                parent = parent.parent;
            }
            this.attributesModel = parent.getModelByPath("attributes");

            aspect.after(this.attributesModel, "onChange", cb);
            this._onMappedAttributeChanged();
        },
        getMappedValues: function () {
            return this.attributesModel.getPlainValue().map(function (attribute) {
                if (!attribute) {
                    return {value: null, label: "null"};
                } else {
                    return {value: attribute.code, label: attribute.label || attribute.code};
                }
            });
        }
    });
});
