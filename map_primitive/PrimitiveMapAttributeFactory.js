define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"../model/SingleObject",
	"../model/PrimitiveMapModel",
	"../list_table/TableAttributeFactory"
], function (lang, declare, SingleObject, PrimitiveMapModel, TableAttributeFactory) {

	return declare([TableAttributeFactory], {

		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles: function (attribute) {
			return attribute.type === "primitive-map";
		},
		create: function (attribute, modelHandle) {

			if (modelHandle.value == null) {
				throw "set default value";
			}

			var tableMeta = this.createTableMeta(attribute);

			var widget = this.inherited(arguments, [tableMeta, modelHandle]);
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
			var map = new PrimitiveMapModel({keyProperty: "key"});
			map.elementFactory = function (value) {
				var aModels = {};
				me.createTableMeta(schema).attributes.forEach(function (attribute) {
					aModels[attribute.code] = me.editorFactory.createAttributeModel(attribute);
				}, this);
				var model = SingleObject({attributes: aModels});
				model.update(value);
				return model;
			};
			return map;
		}
	});
});
