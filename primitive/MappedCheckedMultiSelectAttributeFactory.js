define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojox/form/CheckedMultiSelect",
	"./_MappedSelectAttributeFactoryBase",
	"./bindWidget",
	"../model/PrimitiveModel"
], function (array, declare, CheckedMultiSelect, _MappedSelectAttributeFactoryBase, //
			 bindWidget, PrimitiveModel) {

	return declare([ _MappedSelectAttributeFactoryBase ], {
		id: "mapped-checked-multi-select",
		handles: function (attribute) {
			return attribute != null && attribute.type === "array" && attribute.element && attribute.element.mapped_values;
		},
		create: function (attribute, modelHandle) {
			var options = this._createMappedOptions(modelHandle, attribute.element);

			var clonedValues = [];
			array.forEach(modelHandle.value, function (value) {
				clonedValues.push(value);
			});

			var select = new CheckedMultiSelect({
				options: options,
				multiple: true,
				value: clonedValues
			});

			bindWidget(modelHandle, select, "value");
			this._watchMappedAttribute(modelHandle, attribute.element, select);

			return select;
		},
		createModel: function (meta, plainValue) {
			var model = new PrimitiveModel();
			model.schema = meta;
			model.update(plainValue,true,false);
			return model;
		}


	});
});
