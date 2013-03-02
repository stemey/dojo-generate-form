define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, domClass, at,  meta,getPlainValue,StatefulArray) {

	return declare("gform._MappedSelectAttributeFactoryBase", [], {

		create : function(attribute, modelHandle, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			
			var valueBinding = this.createValueBinding(modelHandle);

			var select = this.createSelect({
				"value" : valueBinding,
				options : options,
				style : "width: 200px;"
			});

			this.initValue(select, modelHandle);
			
			resolver.watch(attribute.mapped_attribute, 
				lang.hitch(this, "_onMappedAttributeChanged", select, attribute, resolver));
			
			if (options.length == 0) {
				this._hideAndDisable(select);
			}
			
			return select;
		},
		
		// Must be implemented in concrete factories
		createValueBinding : function(modelHandle) {
		},

		// Must be implemented in concrete factories
		createSelect : function(config) {
		},

		// Can be implemented in concrete factories
		initValue : function(select, modelHandle) {
		},
		
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
