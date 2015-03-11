define([
	"dojox/mvc/at",
	"dojo/_base/declare",//
	"dojox/form/CheckedMultiSelect",//
	"./createOptions",//
	"./nullablePrimitiveConverter",//
	"../model/PrimitiveModel"//
], function (at, declare, CheckedMultiSelect, createOptions, nullablePrimitiveConverter, PrimitiveModel) {

	return declare([], {
		id: "checked-select",
		handles: function (attribute) {
			var values = attribute.values;
			return values !== null && values.length > 0;
		},


		create: function (meta, modelHandle) {
			var options = createOptions(meta, true);

			var select = new CheckedMultiSelect({
				"value": at(modelHandle, "value").transform(nullablePrimitiveConverter),
				options: options,
				multiple: false
			});

			var plainValue = modelHandle.getPlainValue();
			if (meta.required && !plainValue && options.length > 0) {
				modelHandle.update(options[0]);
			}

			return select;
		},
		createModel: function (meta) {
			var model = new PrimitiveModel({schema: meta});
			return model;
		}

	});
});
