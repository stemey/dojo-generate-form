define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/TextBox"//
], function(array, lang, declare, at, TextBox) {

	return declare("app.TextAttributeFactory", [], {
		handles : function(attribute) {
			return attribute.type == "text" && !attribute.array;
		},
		create : function(attribute, modelHandle) {
			return new TextBox({
				"value" : at(modelHandle, attribute.code)
			});

		}
	})
});
