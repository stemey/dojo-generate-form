define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"../getStateful",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, at, CheckedMultiSelect, getStateful, meta,getPlainValue,StatefulArray) {

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

			var valueBinding = at(modelHandle, "value").direction(at.to).transform({
				parse : function(value) {
					console.log("parse", value);
					return value;
				},
				format : function(value) {
					console.log("format", value);
					return value;
				}
			});

			var select = new CheckedMultiSelect({
				"value" : valueBinding,
				options : options,
				style : "width: 200px;",
				multiple : true
			});
			
			select.set("value", initValue);
			
			return select;
		}
	});
});
