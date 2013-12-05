define([  //
	//
	"dojo/_base/declare",//
	"dojox/mvc/at",//
	"./CurrencyTextBox",//
	//
	"./dijitHelper",//
	"dojo/cldr/monetary",//
	"./nullableNumberConverter",//
	"./PrimitiveAttributeFactory"
], function (declare, at, CurrencyTextBox, dijitHelper, monetary, nullableNumberConverter, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "currencyamount",
		handles: function (attribute) {
			return attribute.type === "number";
		},

		create: function (attribute, modelHandle) {
			var currency = attribute.currency;
			var valueAt = at(modelHandle, "value");
			if (!attribute.amountFractional) {
				var valueConverter = this.createValueConverter(monetary.getData(currency).places);
				valueAt.transform(valueConverter);
			} else {
				valueAt.transform(nullableNumberConverter);
			}
			var props = {
				constraints: {}
			}
			props["value"] = valueAt;
			props["state"] = at(modelHandle, "state");
			props["message"] = at(modelHandle, "message");
			props.currency = currency;
			dijitHelper.copyDijitProperties(attribute, props);
			dijitHelper.copyProperty("min", attribute, props.constraints)
			dijitHelper.copyProperty("max", attribute, props.constraints)
			return new CurrencyTextBox(props);
		},
		createValueConverter: function (places) {
			var operand = Math.pow(10, places);
			return {
				format: function (value) {
					if (typeof value == "undefined") {
						return value;
					} else if (value == null) {
						return NaN;
					} else {
						return value / operand;
					}
				},
				parse: function (value) {
					if (typeof value == "undefined") {
						return value;
					} else if (isNaN(value)) {
						return null;
					} else {
						return Math.round(value * operand);
					}
				}
			};
		},
		getSchema: function () {
			var schema = {};
			schema["id"] = "number";
			schema["description"] = "This is a textfield for numerical amount with currency values based on 'dijit.form.NumberTextBox'.";
			schema["example"] = dojo.toJson({code: 'name', type: 'number', editor: "currencyamount", currency: "USD"}, true);
			var properties = {};
			properties.type = {type: "string", required: true, "enum": ["number"]};
			properties.currency = {type: "string", required: true, maxLength: 3, pattern: "[A-Z]{3}", description: "The currency code according to ISO4217"};
			properties.amountFractional = {type: "boolean", description: "If true the value is a fractional value. Otherwise the value is provided in the minor currency like cents instead of dollars."};
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required", properties);
			dijitHelper.addSchemaProperty("maxLength", properties);
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
