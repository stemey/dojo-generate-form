define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/CheckBox"//
], function(array, lang, declare, at, TextBox) {

	return declare("app.BooleanAttributeFactory", [], {
		handles : function(attribute) {
			return attribute.type.code == "boolean" || attribute.type == "boolean";
		},
		create : function(attribute, modelHandle) {
			return new TextBox({
				"checked" : at(modelHandle, attribute.code)
			});

		}
	})
});
