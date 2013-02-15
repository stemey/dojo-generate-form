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
		

	});
});
