define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mvc/at",//
"./ValidationTextBox",//
"../meta",//
], function(array, lang, declare, aspect, at, TextBox, meta) {

	return declare("app.TextAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		create : function(attribute, modelHandle) {

			//var validAt = at(modelHandle, "valid").transform(validConverter);
			var box = new TextBox({
				"value" : at(modelHandle, "value"),
				"state" : at(modelHandle,"state"),
				"message" : at(modelHandle, "message")
			});
			if (attribute.pattern) {
				box.pattern = attribute.pattern;
			}
			if (attribute.required) {
				box.required = attribute.required;
			}
			return box;

		}
	})
});
