define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"../meta",//
"../getPlainValue",//
"dojox/mvc/StatefulArray",//
"dojo/i18n!../nls/messages"
], function(array, lang, declare, domClass, at,  meta,getPlainValue,StatefulArray, messages) {

	return declare("gform._MappedSelectAttributeFactoryBase", [], {


		
		_onMappedAttributeChanged : function(select, attribute, resolver) {
			var newOptions = this._createMappedOptions(attribute, resolver);
			//var value = 
			var value = select.get("value");
			select.removeOption(select.get("options"));
			select.addOption(newOptions);
			select.set("value",value);
		},

		_watchMappedAttribute: function(attribute,select,resolver) {
			resolver.watch(attribute.mapped_attribute, 
				lang.hitch(this, "_onMappedAttributeChanged", select, attribute, resolver));
		},

		_createMappedOptions : function(attribute, resolver) {
			var mappedValue = resolver.get(attribute.mapped_attribute);
			var values = attribute.mapped_values[mappedValue];
			
			var options = [];
			array.forEach(values, function(value) {
				if (value.label && value.value) {
					options.push({
						label : value.label,
						value : value.value
					});
				} else {
					options.push({
						label : value,
						value : value
					});
				}
			}, this);

			// at least the empty option needs to be added
			if (options.length==0 && !attribute.array) {
				options.push({label:messages["emptySelectLabel"],value:""});
			}
			
			return options;
		},
		

	});
});
