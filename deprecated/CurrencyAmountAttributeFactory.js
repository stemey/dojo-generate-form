define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"dojox/mvc/sync",//
"app/service/RestService",//
"dojo/store/Memory",//
"dijit/form/NumberTextBox"//
], function(array, lang, declare, at, DecoratorWidget, sync, restService,
		Memory, NumberTextBox) {

	return declare("app.CurrencyAmountAttributeFactory", [], {
		handles : function(attribute) {
			return attribute.type.code == "CurrencyAmount" && !attribute.array;
		},
		create : function(attribute, modelHandle) {
			if (modelHandle.get(attribute.code) == null) {
				modelHandle.set(attribute.code, 0);
			}
			var binding = at(modelHandle, attribute.code).transform({
				format : function(value) {
					if (value == null) {
						return null;
					} else {
						return value / 100;
					}
				},
				parse : function(value) {
					return value * 100;
				}
			});
			return new NumberTextBox({
				"value" : binding
			});

		}
	})
});
