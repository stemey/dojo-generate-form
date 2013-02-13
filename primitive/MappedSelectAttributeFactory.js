define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select",//
"./_MappedSelectAttributeFactoryBase",//
"../meta"
], function(array, lang, declare, at, Select, _MappedSelectAttributeFactoryBase, meta) {

	return declare("app.SelectAttributeFactory", [ _MappedSelectAttributeFactoryBase ], {
		
		handles: function(attribute) {
			var mapped_values=attribute.mapped_values;
			return !attribute.array && mapped_values;
		},

		createValueBinding : function(modelHandle) {
			return at(modelHandle, "value");
		},

		createSelect : function(config) {
			return new Select(config);
		}
		
//		create : function(attribute, modelHandle, resolver) {
//			var options = this._createMappedOptions(attribute, resolver);
//			
//			var select = new Select({
//				value : at(modelHandle, "value"),
//				options : options,
//				style : "width:200px;"
//			});
//			
//			resolver.watch(attribute.mapped_attribute, 
//					lang.hitch(this, "_onMappedAttributeChanged", select, attribute, resolver));
//			return select;
//		},
//		
//		_onMappedAttributeChanged : function(select, attribute, resolver) {
//			var options = this._createMappedOptions(attribute, resolver);
//			
//			var valueValid = false;
//			for (var key in options) {
//				var option = options[key];
//				if (option.value == modelHandle.value) {
//					valueValid=true;
//				}
//			}
//			
//			select.set("options", options);
//			if (!valueValid) {
//				modelHandle.set("value", options[0].value);
//			}
//		},
//		
//		_createMappedOptions : function(attribute, resolver) {
//			var mappedValue = resolver.get(attribute.mapped_attribute);
//			var values = attribute.mapped_values[mappedValue];
//			
//			var options = [];
//			for ( var key in values) {
//				var value = values[key];
//				
//				if (value.label && value.option) {
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
