define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"dijit/form/NumberTextBox",//
		"../meta"//

		],
		function(array, lang, declare, at, NumberTextBox,meta) {

			return declare(
					"app.TextAttributeFactory",
					[],
					{
						handles : function(attribute) {
							return meta.isType(attribute,"number")
									&& !attribute.array;
						},
						create : function(attribute, modelHandle) {
							return new NumberTextBox({
								"value" : at(modelHandle, "value")
							});

						}
					})
		});
