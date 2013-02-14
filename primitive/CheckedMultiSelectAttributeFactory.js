define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/form/CheckedMultiSelect",//
"../updateModelHandle",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray",//
"dojox/mvc/equals"
], function(array, lang, declare, aspect, CheckedMultiSelect, updateModelHandle, meta,getPlainValue,StatefulArray, equals) {

	return declare("gform.CheckedMultiSelectAttributeFactory", [], {

		handles : function(attribute) {
			var values = meta.getTypeAttribute(attribute, "values");	
			return attribute.array && values != null && values.length > 0;
		},
		
		create : function(attribute, modelHandle) {
			var options = [];
			for ( var key in attribute.values) {
				var value = attribute.values[key];
				options.push({
					label : value,
					value : value
				});
			}
			var initValue = getPlainValue(modelHandle.value);


			var select = new CheckedMultiSelect({
				"value" : initValue		,
				options : options,
				style : "width: 200px;",
				multiple : true
			});
			
			select.set("value", initValue);
			
			select.watch("value",function(propName,old,nu) {
				if (!equals(old,nu) && !equals(nu,modelHandle.value)) {
					modelHandle.set("value",nu);
				}
			});
			var valueWatch = modelHandle.watch("value",function(propName,old,nu) {
				if (!equals(old,nu) && !equals(nu,select.value)) {
					select.set("value",nu);
				}
			});
			aspect.after(select,"destroy",function() {
				valueWatch.remove()
			});
			
			return select;
		},
		updateModelHandle: function(meta,plainValue,modelHandle) {
			modelHandle.set("value",plainValue);
		}
	});
});
