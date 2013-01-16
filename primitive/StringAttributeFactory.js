define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/ValidationTextBox",//
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
			return new TextBox({
				"value" : at(modelHandle[attribute.code], "value"),
				"valid" : at(modelHandle[attribute.code], "valid")
			});

		}
	})
});
