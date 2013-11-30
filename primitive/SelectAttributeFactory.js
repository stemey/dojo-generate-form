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
			var values = attribute["values"];
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
		},
		getSchema: function () {
			var schema = {};
			schema["id"] = "select";
			var properties = {};
			schema["description"] = "This is a select field. The options are specified as an array of label value pairs and or values. It is based on 'dijit.form.Select'";
			schema["example"] = dojo.toJson({code: 'name', type: 'string', values: [
				{label: "Mr.", value: "Mr"},
				"Mrs."
			]}, true);
			schema.properties = properties;
			properties.type = {type: "string", required: true, "enum": ["string"]};
			properties.values = {
				type: "array",
				items: {
					type: [
						"string",
						{
							type: "object",
							properties: {
								label: {type: "string"},
								value: {type: "string"}
							},
							required: ["value", "label"]
						}
					]
				}
			};
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required", properties);
			dijitHelper.addSchemaProperty("promptMessage", properties);
			dijitHelper.addSchemaProperty("placeHolder", properties);
			dijitHelper.addSchemaProperty("invalidMessage", properties);
			return schema;
		}
	});

});
