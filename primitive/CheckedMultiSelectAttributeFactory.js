define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"./_SelectAttributeFactoryBase",//
"../getStateful",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, at, CheckedMultiSelect, _SelectAttributeFactoryBase, getStateful, meta,getPlainValue,StatefulArray) {

	return declare("gform.CheckedMultiSelectAttributeFactory", [ _SelectAttributeFactoryBase ], {
 		
 		emptyOptionSupported : false,

		handles : function(attribute) {
			return attribute != null && attribute.array && !attribute.validTypes && attribute.values;
		},
		
		createValueBinding : function(modelHandle) {
			return at(modelHandle, "value").direction(at.to);
		},
 		
 		createSelect : function(config) {
 			config["multiple"] = true;
			return new CheckedMultiSelect(config);
 		},

		initValue : function(select, modelHandle) {
			if (modelHandle.oldValue == null || typeof modelHandle.oldValue == "undefined") {
				modelHandle.set("oldValue", []);
			}
			var plainValue = getPlainValue(modelHandle.value);
			select.set("value", plainValue);
		}
		
	});
});
