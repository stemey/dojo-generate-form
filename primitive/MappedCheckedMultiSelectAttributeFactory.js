define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"../getStateful",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, domClass, at, CheckedMultiSelect, getStateful, meta,getPlainValue,StatefulArray) {

	return declare("gform.MappedCheckedMultiSelectAttributeFactory", [], {

		handles : function(attribute) {
			return attribute != null && attribute.array && !attribute.validTypes && attribute.mapped_values;
		},
		
		create : function(attribute, modelHandle, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			
			var valueBinding = at(modelHandle, "value").direction(at.to).transform({
				parse : function(value) {
					console.log("parse cm", value);
					return value;
				},
				format : function(value) {
					console.log("format cm", value);
					return value;
				}
			});

			var select = new CheckedMultiSelect({
				"value" : valueBinding,
				options : options,
				style : "width: 200px;",
				multiple : true
			});

			initValue = getPlainValue(modelHandle.value);
			select.set("value", initValue);
			
			resolver.watch(attribute.mapped_attribute, 
				lang.hitch(this, "_onMappedAttributeChanged", select, attribute, resolver));
			
			return select;
		},
		
		_onMappedAttributeChanged : function(select, attribute, resolver) {
			var newOptions = this._createMappedOptions(attribute, resolver);
			
			if (newOptions.length == 0) {
				select.set("disabled", true);
				domClass.add(select.domNode, "dijitHidden");
				
				select.removeOption(select.getOptions());
			} else {
				select.set("disabled", false);
				domClass.remove(select.domNode, "dijitHidden");
				
				this._removeOldOptions(select, newOptions);
				this._addNewOptions(select, newOptions);
			}
		},
		
		_createMappedOptions : function(attribute, resolver) {
			var mappedValue = resolver.get(attribute.mapped_attribute);
			var values = attribute.mapped_values[mappedValue];
			
			var options = [];
			array.forEach(values, function(value) {
				options.push({
					label : value,
					value : value
				});
			}, this);
			
			return options;
		},
		
		_removeOldOptions : function(select, newOptions) {
			var currentOptions = select.getOptions();
			var optionsToRemove = [];
			
			array.forEach(currentOptions, function(currentOption) {
				var currentValid = false;
				array.forEach(newOptions, function(newOption) {
					if (newOption.value == currentOption.value) {
						currentValid = true;
					}
				}, this);
				
				if (!currentValid) {
					optionsToRemove.push(currentOption);
				} 
			}, this);
			
			select.removeOption(optionsToRemove);
		},
		
		_addNewOptions : function(select, newOptions) {
			var optionsToAdd = [];
			array.forEach(newOptions, function(newOption) {
				if (!select.getOptions(newOption)) {
					optionsToAdd.push(newOption);
				} 
			}, this);
			select.addOption(optionsToAdd);
		}
	});
});
