define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select",//
"./_SelectAttributeFactoryBase",//
"../getStateful",//
"../meta"//
], function(array, lang, declare, at, Select, _SelectAttributeFactoryBase, getStateful, meta) {

 	return declare("gform.SelectAttributeFactory", [ _SelectAttributeFactoryBase ], {

 		handles : function(attribute) {
 			var values = meta.getTypeAttribute(attribute,"values");	
 			return !attribute.array && values != null && values.length > 0;
 		},
 		
 		createValueBinding : function(modelHandle) {
 			var valueConverter = this.createValueConverter();
			return at(modelHandle, "value").transform(valueConverter);
		},
 		
 		createSelect : function(config) {
 			return new Select(config);
 		}
 		
// 		create : function(attribute, modelHandle) {
// 			var options = this._createOptions(attribute);
//
//			var valueConverter = this._createValueConverter();
//			var valueBinding = at(modelHandle, "value").transform(valueConverter);
//
// 			var select = new Select({
// 				value : valueBinding,
// 				options : options,
// 				style:"width:200px;"
// 			});
// 			
// 			if (false && options.length > 0) {
// 				modelHandle.set("value", options[0].value);
// 			}
// 			return select;
// 		},
//		
//		_createOptions : function(attribute) {
//			var options = [];
//			if (!attribute.required) {
//				options.push(this._createEmptyOption(attribute));
//			}
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
//		},
//		
//		_createEmptyOption : function(attribute) {
//			var emptyValueLabel = "-- SELECT --";
//			if (attribute.emptyValueLabel) {
//				emptyValueLabel = attribute.emptyValueLabel;
//			}
//			return {
//				label : emptyValueLabel,
//				value : ""
//			};
//		},
//		
//		_createValueConverter : function() {
//			return {
//				format : function(value) {
//					return value == null ? "" : value;
//				},
//				parse : function(value) {
//					if (value == "") {
//						return null;
//					} else {
//						return value;
//					}
//				}
//			};
//		}
 	});
});
