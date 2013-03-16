define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"dijit/form/NumberTextBox",//
		"../meta"//

		],
		function(array, lang, declare) {
			
			var properties=[
				"maxLength",
				"missingMessage",
				"promptMessage",
				"placeHolder",
				"invalidMessage",
				"rangeMessage",
				"required",
				"readOnly",
				"disabled",
				"pattern",
				"properCase",
				"upperCase"
			]

			return function(attribute,props) {
				if (attribute.dijitOptions) {
					lang.mixin(props,dijitOptions);
				}
				array.forEach(properties,function(prop) {
					if (attribute[prop]) {
						props[prop]=attribute[prop];
					}
				});
			}
		});
