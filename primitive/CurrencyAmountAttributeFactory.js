define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/NumberTextBox",//
"../meta",//
"./dijitHelper"
], function(array, lang, declare, at, NumberTextBox, meta, dijitHelper) {

	return declare( "gform.CurrencyAmountAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute, "number") && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);
			// is this like currencyTextBox ? then add missing props: fractional, invalidMessage,currency,lang
			var props={
				"value" : valueAt,
				"state" : at(modelHandle, "state"),
				"constraints" : {
					"type" : "currency"
				}
			}
			dijitHelper.copyProperty("currency",attribute,props);
			return new NumberTextBox(props);
		},
		
		createValueConverter : function() {
			return {
				format : function(value) {
					if (value == null) {
						return null;
					} else {
						return value / 100;
					}
				},
				parse : function(value) {
					return Math.round(value * 100);
				}
			};
		}
	});
	
});
