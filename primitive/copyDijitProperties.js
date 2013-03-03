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
				"missingMessage",
				"promptMessage",
				"placeHolder",
				"invalidMessage",
				"rangeMessage",
				"required",
				"readOnly",
				"disabled"
				]

			return function(attribute,props) {
				if (attribute.dijitOptions) {
					lang.mixin(props,dijitOptions);
				}
				array.forEach(properties,function(propIdx) {
					var prop=properties[propIdx];
					if (attribute[prop]) {
						props[prop]=attribute[prop];
					}
				});
			}
		});
