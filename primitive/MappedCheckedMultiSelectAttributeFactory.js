define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"./_MappedSelectAttributeFactoryBase",//
"./bindWidget",//
"../model/PrimitiveModel",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, domClass, at, CheckedMultiSelect, _MappedSelectAttributeFactoryBase, //
		 bindWidget, PrimitiveModel, StatefulArray) {

	return declare( [ _MappedSelectAttributeFactoryBase ], {

		handles : function(attribute) {
			return attribute != null && attribute.type=="primitive-array" && attribute.element.mapped_values;
		},
			create : function(attribute, modelHandle) {
			var options = this._createMappedOptions(modelHandle, attribute.element);
			
			var clonedValues = [];
			array.forEach(modelHandle.value, function(value) {
				clonedValues.push(value);
			});

			var select = new CheckedMultiSelect({
				options : options,
				multiple : true,
				value : clonedValues
			});

			bindWidget(modelHandle,select,"value");
			this._watchMappedAttribute(modelHandle, attribute.element,select);
			
			return select;
		},
		createModel: function(meta,plainValue) {
			var model = new PrimitiveModel();
			model.update(plainValue);
			return model;
		}
		

	});
});
