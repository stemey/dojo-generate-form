define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/form/CheckedMultiSelect",//
"../model/updateModelHandle",//
"./createOptions",//
"./bindWidget",//
"../model/PrimitiveModel",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, aspect, CheckedMultiSelect, updateModelHandle,   createOptions,bindWidget,PrimitiveModel,StatefulArray) {

	return declare( [  ], {
 		
		handles : function(attribute) {
			return attribute != null && attribute.type=="primitive-array" && attribute.element.values;
		},
 		
 		create: function(meta, modelHandle) {
			var options= createOptions(meta.element,false);

			var clonedValues = [];
			array.forEach(modelHandle.getPlainValue(), function(value) {
				clonedValues.push(value);
			});
			
			var select = new CheckedMultiSelect({
				"value" : clonedValues,
				options : options,
				multiple : true
			});
			
			bindWidget(modelHandle,select,"value");
			
			return select;
		},
		
		createModel: function(meta,plainValue) {
			if (!plainValue) {
				plainValue=[];
			}
			var model = new PrimitiveModel();
			model.update(plainValue);
			return model;
		}
	});
});
