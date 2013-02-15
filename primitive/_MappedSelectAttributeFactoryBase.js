define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"../getStateful",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, domClass, at, getStateful, meta,getPlainValue,StatefulArray) {

	return declare("gform._MappedSelectAttributeFactoryBase", [], {


		
		_onMappedAttributeChanged : function(select, attribute, resolver) {
			var newOptions = this._createMappedOptions(attribute, resolver);
			
			if (newOptions.length == 0) {
				this._hideAndDisable(select);
				select.removeOption(select.getOptions());
			} else {
				this._showAndEnable(select);
				this._removeOldOptions(select, newOptions);
				this._addNewOptions(select, newOptions);
			}
		},

		_watchMappedAttribute: function(attribute,select,resolver) {
			resolver.watch(attribute.mapped_attribute, 
				lang.hitch(this, "_onMappedAttributeChanged", select, attribute, resolver));
		},

		_hideAndDisable : function(select) {
			select.set("disabled", true);
			domClass.add(select.domNode, "dijitHidden");
		},
		
		_showAndEnable : function(select) {
			select.set("disabled", false);
			domClass.remove(select.domNode, "dijitHidden");
		},
		
		_createMappedOptions : function(attribute, resolver) {
			var mappedValue = resolver.get(attribute.mapped_attribute);
			var values = attribute.mapped_values[mappedValue];
			
			var options = [];
			array.forEach(values, function(value) {
				if (value.label && value.value) {
					options.push(value);
				} else {
					options.push({
						label : value,
						value : value
					});
				}
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
