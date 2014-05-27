define([
    "../list_table/RepeatedSingleEmbeddedAttributeFactory",
    "dojo/_base/lang",
    "dojo/_base/declare",
    "../model/SingleObject",
    "../model/PrimitiveMapModel"
], function (RepeatedSingleEmbeddedAttributeFactory, lang, declare, SingleObject, PrimitiveMapModel) {

    return declare([RepeatedSingleEmbeddedAttributeFactory], {
        id: "primitive-map",
        constructor: function (kwArgs) {
            lang.mixin(this, kwArgs);
        },
        handles: function (attribute) {
            return attribute.type === "map" && attribute.keyAttribute && attribute.valueAttribute;
        },
        create: function (attribute, modelHandle, ctx) {

            if (modelHandle.value === null) {
                throw "set default value";
            }

            var tableMeta = this.createTableMeta(attribute);

            var widget = this.inherited(arguments, [tableMeta, modelHandle, ctx]);
            return widget;


        },
        createTableMeta: function (schema) {
            var tableMeta = {type: "table-single-array", reorderable: false, attributes: []};
            var attributes = tableMeta.attributes;
            var key = {};
            lang.mixin(key, schema.keyAttribute);
            key.type = "string";
            key.code = "key";
            key.required = true;
            attributes.push(key);
            var value = {};
            lang.mixin(value, schema.valueAttribute);
            value.code = "value";
            attributes.push(value);
            return tableMeta;
        },
        createModel: function (schema, value) {
            var me = this;
            var validators = this.editorFactory.getModelValidators(schema);
            var map = new PrimitiveMapModel({keyProperty: "key", "validators": validators});
            map.elementFactory = function (value) {
                var aModels = {};
                var tableSchema = me.createTableMeta(schema);
                var model = new SingleObject({schema: tableSchema, editorFactory: me.editorFactory});
                model.update(value);
                return model;
            };
            return map;
        }
    });
});
