define([ "dojo/_base/array", 
"dojo/_base/lang",
"dojo/_base/declare",
"dojox/mvc/at",
"dijit/form/Select",
"./_MappedSelectAttributeFactoryBase",
"../meta"
], function(array, lang, declare, at, Select, _MappedSelectAttributeFactoryBase, meta) {

	return declare("gform.MappedSelectAttributeFactory", [ _MappedSelectAttributeFactoryBase ], {
		
		handles: function(attribute) {
			var mapped_values=attribute.mapped_values;
			return !attribute.array && mapped_values;
		},
		
		create : function(attribute, modelHandle, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			
			var select = new Select({
				value : at(modelHandle, "value"),
				options : options,
				style : "width:200px;"
			});
			
			if (attribute.required && !modelHandle.value) {
				modelHandle.set("value",options[0].value);
			}
			
			resolver.watch(attribute.mapped_attribute, 
					lang.hitch(this, "_onMappedAttributeChanged", modelHandle, select, attribute, resolver));
			
			
			return select;
		},
		
		_onMappedAttributeChanged : function(modelHandle, select, attribute, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			
			var valueValid = false;
			for (var key in options) {
				var option = options[key];
				if (option.value == modelHandle.value) {
					valueValid=true;
				}
			}
			
			
			
			select.set("options", options);
			if (!valueValid) {
				modelHandle.set("value", options[0].value);
			}
		}
		
	});
});
