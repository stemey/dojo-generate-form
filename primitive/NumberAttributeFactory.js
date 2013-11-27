define(
	[
		"dojo/aspect",
		"dojo/_base/lang",
		"dojo/_base/declare",
		"./NumberTextBox",
		"../schema/meta",
		"./dijitHelper",
		"./mixinNumberboxBindings",
		"./PrimitiveAttributeFactory"
	],
	function (aspect, lang, declare, NumberTextBox, meta, dijitHelper, mixinNumberboxBindings, PrimitiveAttributeFactory) {

		return declare(
			[PrimitiveAttributeFactory],
			{
				handles: function (attribute) {
					return meta.isType(attribute, "number")
						&& !attribute.array;
				},
				create: function (attribute, modelHandle) {
					var constraints = {};
					var props = {
						constraints: constraints
					}
					mixinNumberboxBindings(modelHandle, props);

					dijitHelper.copyProperty("constraints", attribute, props);
					dijitHelper.copyDijitProperties(attribute, props);
					if (attribute.numberFormat && attribute.numberFormat != "") {
						constraints.pattern = attribute.numberFormat;
					}
					dijitHelper.copyProperty("places", attribute, constraints)
					dijitHelper.copyProperty("min", attribute, constraints)
					dijitHelper.copyProperty("max", attribute, constraints)
					var widget = new NumberTextBox(props);
					aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
					return widget;

				},
				getSchema: function () {
					var schema = {};
					schema["id"] = "number";
					schema["description"] = "This is a textfield for numerical values based on 'dijit.form.NumberTextBox'.";
					schema["example"] = dojo.toJson({code: 'name', type: 'number', numberFormat: "#.###"}, true);
					var properties = {};
					properties.type = {type: "string", required: true, "enum": ["number"]};
					dijitHelper.addSchemaProperties(properties);
					dijitHelper.addSchemaProperty("required", properties);
					dijitHelper.addSchemaProperty("maxLength", properties);
					properties.numberFormat = {type: "string", description: "a pattern for displaying the number like ###.###,##"};
					properties.places = {type: "string", description: "number of decimal places (e.g. '3' or '0,3')"};
					properties.fractional = {type: "boolean", description: "false if only integers are allowed"};
					properties.min = {type: "number", description: "the minimum value"};
					properties.max = {type: "number", description: "the maximum value"};
					dijitHelper.addSchemaProperty("missingMessage", properties);
					dijitHelper.addSchemaProperty("promptMessage", properties);
					dijitHelper.addSchemaProperty("placeHolder", properties);
					dijitHelper.addSchemaProperty("invalidMessage", properties);

					schema.properties = properties;
					return schema;
				}
			});
	});
