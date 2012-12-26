define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"dijit/form/NumberTextBox"//

		],
		function(array, lang, declare, at, NumberTextBox) {

			return declare(
					"app.TextAttributeFactory",
					[],
					{
						handles : function(attribute) {
							return (attribute.type == "Integer" || attribute.type == "Long" || attribute.type == "int" || attribute.type == "long")
									&& !attribute.array;
						},
						create : function(attribute, modelHandle) {
							return new NumberTextBox({
								"value" : at(modelHandle, attribute.code)
							});

						}
					})
		});
