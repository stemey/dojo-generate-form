define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./ValidationTextBox",//
"../meta",//
"../getStateful"//
], function(array, lang, declare, at, TextBox, meta, getStateful) {

	return declare("app.TextAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute,"string") && !attribute.array;
		},
		create : function(attribute, modelHandle) {
			
			if (!modelHandle[attribute.code]) {
				modelHandle[attribute.code]=getStateful(null);
			}			
			var validConverter ={
					parse:function(state){
									return state!="Error"
									},
					format: function(valid){
									return valid?"":"Error"
									}
			};
			var validAt=at(modelHandle[attribute.code], "valid").transform(validConverter);
			return new TextBox({
				"value" : at(modelHandle[attribute.code], "value"),
				"state" : validAt,
				"message" : at(modelHandle[attribute.code], "message"),
				"pattern" : attribute.pattern
			});

		}
	})
});
