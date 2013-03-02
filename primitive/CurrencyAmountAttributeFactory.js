define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/NumberTextBox",//
"../meta"//
], function(array, lang, declare, at, NumberTextBox,meta) {

	return declare( "gform.CurrencyAmountAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute, "number") && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);
			
			return new NumberTextBox({
				"value" : valueAt,
				"constraints" : {
					"type" : "currency"
				}
			});
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
