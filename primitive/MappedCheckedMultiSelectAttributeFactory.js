define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"./_MappedSelectAttributeFactoryBase",//
"../getStateful",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, domClass, at, CheckedMultiSelect, _MappedSelectAttributeFactoryBase, //
		getStateful, meta, getPlainValue, StatefulArray) {

	return declare("gform.MappedCheckedMultiSelectAttributeFactory", [ _MappedSelectAttributeFactoryBase ], {

		handles : function(attribute) {
			return attribute != null && attribute.array && !attribute.validTypes && attribute.mapped_values;
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
			initValue = getPlainValue(modelHandle.value);
			select.set("value", initValue);
		}
		
	});
});
