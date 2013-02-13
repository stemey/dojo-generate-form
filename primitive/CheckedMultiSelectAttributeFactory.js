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
			var initValue = getPlainValue(modelHandle.value);
			select.set("value", initValue);
		}
		
//		create : function(attribute, modelHandle) {
//			var options = this._createOptions(attribute);
//			
//			var valueBinding = at(modelHandle, "value").direction(at.to);
//
//			var select = new CheckedMultiSelect({
//				"value" : valueBinding		,
//				options : options,
//				style : "width: 200px;",
//				multiple : true
//			});
//
//			if (modelHandle.oldValue == null || typeof modelHandle.oldValue == "undefined") {
//				modelHandle.set("oldValue", []);
//			}
//			var initValue = getPlainValue(modelHandle.value);
//			select.set("value", initValue);
//			
//			return select;
//		},
//		
//		_createOptions : function(attribute) {
//			var options = [];
//			for ( var key in attribute.values) {
//				var value = attribute.values[key];
//				if (value.label && value.value) {
//					options.push(value);
//				} else {
//					options.push({
//						label : value,
//						value : value
//					});
//				}
//			}
//			return options;
//		}
	});
});
