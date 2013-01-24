define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"dijit/form/NumberTextBox",//
		"../getStateful",//
"../meta"//

		],
		function(array, lang, declare, at, NumberTextBox,getStateful,meta) {

			return declare(
					"app.TextAttributeFactory",
					[],
					{
						handles : function(attribute) {
							return meta.isType(attribute,"number")
									&& !attribute.array;
						},
						create : function(attribute, modelHandle) {
							if (!modelHandle[attribute.code]) {
								modelHandle[attribute.code]=getStateful(0);
							}			
							return new NumberTextBox({
								"value" : at(modelHandle[attribute.code], "value")
							});

						}
					})
		});
