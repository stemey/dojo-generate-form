define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/TextBox",//
"../meta"//
], function(array, lang, declare, at, TextBox, meta) {

	return declare("app.TextAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute,"string") && !attribute.array;
		},
		create : function(attribute, modelHandle) {
			return new TextBox({
				"value" : at(modelHandle, attribute.code)
			});

		}
	})
});
