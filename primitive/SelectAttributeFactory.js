define([
    "../model/SelectModel",
    "dojo/_base/declare",
    "dojox/mvc/at",
    "./Select",
    "./createOptions",
    "./nullablePrimitiveConverter",
    "./PrimitiveAttributeFactory"

], function (SelectModel, declare, at, Select, createOptions, nullablePrimitiveConverter, PrimitiveAttributeFactory) {

    return declare([PrimitiveAttributeFactory], {
        id: "select",

        handles: function (attribute) {
            var values = attribute.values;
            var store = attribute.store;
            return !attribute.array &&  !!values && values.length > 0 ;
        },

        create: function (attribute, modelHandle) {

            var valueBinding = at(modelHandle, "value").transform(
                nullablePrimitiveConverter);

            var select = new Select({
                "value": valueBinding,
                options: at(modelHandle, "options"),
                maxHeight: -1
            });



            return select;

        },
        createModel: function (meta, plainValue) {
            var validators = this.editorFactory.getModelValidators(meta);
            var options = createOptions(meta, true);
            var model = new SelectModel({schema: meta, options: options, validators: validators, required: meta.required === true});
            model.update(plainValue);
            return model;
        }
    });

});
