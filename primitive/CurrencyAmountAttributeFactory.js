define([
	"dojo/_base/declare",//
	"dojox/mvc/at",//
	"./CurrencyTextBox",//
	"./dijitHelper",//
	"dojo/cldr/monetary",//
	"./nullableNumberConverter",//
	"./PrimitiveAttributeFactory"
], function (declare, at, CurrencyTextBox, dijitHelper, monetary, nullableNumberConverter, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "currencyamount",
		alwaysUseInvalidMessage: true,
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
			};
			props.value = valueAt;
			props.state = at(modelHandle, "state");
			props.message = at(modelHandle, "message");
			props.currency = currency;
			dijitHelper.copyDijitProperties(attribute, props);
			dijitHelper.copyProperty("min", attribute, props.constraints);
			dijitHelper.copyProperty("max", attribute, props.constraints);
			return new CurrencyTextBox(props);
		},
		createValueConverter: function (places) {
			var operand = Math.pow(10, places);
			return {
				format: function (value) {
					if (typeof value === "undefined") {
						return value;
					} else if (value === null) {
						return NaN;
					} else {
						return value / operand;
					}
				},
				parse: function (value) {
					if (typeof value === "undefined") {
						return value;
					} else if (isNaN(value)) {
						return null;
					} else {
						return Math.round(value * operand);
					}
				}
			};
		}
	});

});
