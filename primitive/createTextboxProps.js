define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mvc/at",//
"./ValidationTextBox",//
"../meta",//
], function(array, lang, declare, aspect, at, TextBox, meta) {

	return function(modelHandle,props) {
			var validConverter = {
				parse : function(state) {
					return state != "Error"
				},
				format : function(valid) {
					return valid ? "" : "Error"
				}
			};
			var validAt = at(modelHandle, "valid").transform(validConverter);
			props["value"]=at(modelHandle, "value");
			props["state"]=validAt;
			props["message"]=at(modelHandle, "message")

	}
	
});
