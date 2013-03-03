define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"./NumberTextBox",//
"../meta",//
"./copyProperty",
"./copyDijitProperties",
"./mixinTextboxBindings"
		],
		function(array, lang, declare, at, NumberTextBox,meta,copyProperty,copyDijitProperties, mixinTextboxBindings) {

			return declare(
					"gform.NumberAttributeFactory",
					[],
					{
						handles : function(attribute) {
							return meta.isType(attribute,"number")
									&& !attribute.array;
						},
						create : function(attribute, modelHandle) {
							var props={
							}
							mixinTextboxBindings(modelHandle,props);
							copyProperty("constraints",attribute,props)
							copyDijitProperties(attribute,props);
							return new NumberTextBox(props);

						}
					})
		});
