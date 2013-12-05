define([
	"dojo/_base/declare",//
	"dojox/form/CheckedMultiSelect",//
	"./createOptions",//
	"./nullablePrimitiveConverter",//
	"../model/PrimitiveModel"//
], function (declare, CheckedMultiSelect, createOptions, nullablePrimitiveConverter, PrimitiveModel) {

	return declare([ ], {
		id: "checked-select",
		handles: function (attribute) {
			var values = attribute.values;
			return values != null && values.length > 0;
		},


		create: function (meta, modelHandle) {
			var options = createOptions(meta, true);

			var select = new CheckedMultiSelect({
				"value": at(modelHandle, "value").transform(nullablePrimitiveConverter),
				options: options,
				multiple: false
			});

			if (meta.required && !plainValue) {
				modelHandle.update(options[0]);
			}

			return select;
		},
		createModel: function (meta, plainValue) {
			var model = new PrimitiveModel();
			model.update(plainValue);
			return model;
		}

	});
});
