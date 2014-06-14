define([
    "./AbstractMappedSelectModel",
    "dojo/_base/declare"
], function (AbstractMappedSelectModel, declare) {
    // module:
    //		gform/model/MappedSelectModel

    return declare("gform.model.MappedSelectModel", [AbstractMappedSelectModel], {
        mappedValues: null,
        mappedAttribute: null,
        startListening: function (parent, cb) {
            parent.watchPath(this.mappedAttribute, cb);
        },
        getMappedValues: function () {
            var mappedValue = this.parent.getModelByPath(this.mappedAttribute).getPlainValue();
            return this.mappedValues[mappedValue];
        }
    });
});
