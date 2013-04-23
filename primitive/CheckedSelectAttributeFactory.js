define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/form/CheckedMultiSelect",//
"./createOptions",//
"./nullablePrimitiveConverter",//
"../updateModelHandle",//
], function(array, lang, declare, CheckedMultiSelect, createOptions, nullablePrimitiveConverter, updateModelHandle) {

	return declare("gform.CheckedSelectAttributeFactory", [ ], {

		handles : function(attribute) {
			var values = attribute.values;	
			return !attribute.array && values != null && values.length > 0;
		},
 		

 		create : function(meta,modelHandle) {
			var options= createOptions(meta,true);

			var select = new CheckedMultiSelect({
				"value" : at(modelHandle,"value").transform(nullablePrimitiveConverter),
				options : options,
				multiple : false
			});
			
			return select;
 		},
		updateModelHandle : function(meta, plainValue, modelHandle) {
			updateModelHandle.updateSelectModelHandle(meta, plainValue, modelHandle,createOptions(meta,true));
		}
		
	});
});
