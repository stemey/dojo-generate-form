define([ "dojo/_base/array",
	"dojo/_base/declare",
	"dojox/form/CheckedMultiSelect",
	"./createOptions",
	"./bindWidget",
	"../model/PrimitiveModel"
], function (array, declare, CheckedMultiSelect, createOptions, bindWidget, PrimitiveModel) {

	return declare([  ], {
		id: "multi-checked-select",
		handles: function (attribute) {
			return attribute != null && attribute.type === "primitive-array" && attribute.element.values;
		},

		create: function (meta, modelHandle) {
			var options = createOptions(meta.element, false);

			var clonedValues = [];
			array.forEach(modelHandle.getPlainValue(), function (value) {
				clonedValues.push(value);
			});

			var select = new CheckedMultiSelect({
				"value": clonedValues,
				options: options,
				multiple: true
			});

			bindWidget(modelHandle, select, "value");

			return select;
		},

		createModel: function (meta, plainValue) {
			if (!plainValue) {
				plainValue = [];
			}
			var model = new PrimitiveModel();
			model.update(plainValue);
			return model;
		}
	});
});
