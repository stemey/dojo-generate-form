define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./ValidationTextBox",//
"../meta",//
], function(array, lang, declare, at, TextBox, meta) {

	return declare("app.TextAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute,"string") && !attribute.array;
		},
		create : function(attribute, modelHandle) {
			
			var validConverter ={
					parse:function(state){
									return state!="Error"
									},
					format: function(valid){
									return valid?"":"Error"
									}
			};
			var validAt=at(modelHandle, "valid").transform(validConverter);
			var box = new TextBox({
				"value" : at(modelHandle, "value"),
				"state" : validAt,
				"message" : at(modelHandle, "message")
			});
			if (attribute.pattern) {
				box.pattern=attribute.pattern;
			}
			if (attribute.required) {
				box.required=attribute.required;
			}
			return box;

		}
	})
});
