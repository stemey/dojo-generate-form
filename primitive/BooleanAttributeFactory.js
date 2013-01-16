define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/CheckBox",//
"../meta"//
], function(array, lang, declare, at, CheckBox, meta) {

	return declare("app.BooleanAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute,"boolean") && !attribute.array;
		},
		create : function(attribute, modelHandle) {
			if (!modelHandle[attribute.code]) {
				modelHandle[attribute.code]=getStateful(false);
			}			
			return new CheckBox({
				"checked" : at(modelHandle, attribute.code)
			});

		}
	})
});
