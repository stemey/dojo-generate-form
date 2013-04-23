define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"./_MappedSelectAttributeFactoryBase",//
"./bindArray",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, domClass, at, CheckedMultiSelect, _MappedSelectAttributeFactoryBase, //
		 bindArray, getPlainValue,StatefulArray) {

	return declare("gform.MappedCheckedMultiSelectAttributeFactory", [ _MappedSelectAttributeFactoryBase ], {

		handles : function(attribute) {
			return attribute != null && attribute.array && !attribute.validTypes && attribute.mapped_values;
		},
			create : function(attribute, modelHandle, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			
			var clonedValues = [];
			array.forEach(modelHandle.value, function(value) {
				clonedValues.push(value);
			});

			var select = new CheckedMultiSelect({
				options : options,
				multiple : true,
				value : clonedValues
			});

			bindArray(modelHandle,select,"value");
			this._watchMappedAttribute(attribute,select,resolver);
			
			return select;
		},
		updateModelHandle: function(meta,plainValue,modelHandle) {
			if (!plainValue) {
				plainValue=[];
			}
			modelHandle.set("value",plainValue);
			modelHandle.set("oldValue",plainValue);
		}
		

	});
});
