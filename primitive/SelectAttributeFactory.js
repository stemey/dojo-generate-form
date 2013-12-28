define([
	"../model/SelectModel",
	"dojo/_base/declare",
	"dojox/mvc/at",
	"./Select",
	"./createOptions",
	"./nullablePrimitiveConverter",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"

], function (SelectModel, declare, at, Select, createOptions, nullablePrimitiveConverter, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {

		handles: function (attribute) {
			var values = attribute.values;
			return !attribute.array && values != null && values.length > 0;
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
			var model = new SelectModel({options: options, validators: validators, required: meta.required === true});
			model.update(plainValue);
			return model;
		}
	});

});
