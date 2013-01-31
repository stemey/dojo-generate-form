define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/CheckBox",//
"../getStateful",//
"../meta"//
], function(array, lang, declare, at, CheckBox, getStateful, meta) {

	return declare("app.BooleanAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute,"boolean") && !attribute.array;
		},
		create : function(attribute, modelHandle) {
			if (!modelHandle) {
				modelHandle=getStateful(false);
			}			
			return new CheckBox({
				"checked" : at(modelHandle,"value")
			});

		}
	})
});
