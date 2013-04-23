define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"../meta"//
], function(array, lang, declare, at,  meta) {

 	return declare("gform._SelectAttributeFactoryBase", [], {
 		
 		emptyOptionSupported : true,
 		
 		create : function(attribute, modelHandle) {
 			var options = this._createOptions(attribute);

			var valueBinding = this.createValueBinding(modelHandle);

 			var select = this.createSelect({
 				value : valueBinding,
 				options : options
 			});
 			
 			this.initValue(select, modelHandle);
 			
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
		
		createValueConverter : function() {
			return {
				format : function(value) {
					return value == null ? "" : value;
				},
				parse : function(value) {
					if (value == "") {
						return null;
					} else {
						return value;
					}
				}
			};
		},
		
		_createOptions : function(attribute) {
			var options = [];
			if (this.emptyOptionSupported && !attribute.required) {
				options.push(this._createEmptyOption(attribute));
			}
			for ( var key in attribute.values) {
				var value = attribute.values[key];
				if (value.label && value.value) {
					options.push(value);
				} else {
					options.push({
						label : value,
						value : value
					});
				}
			}
			return options;
		},
		
		_createEmptyOption : function(attribute) {
			var emptyValueLabel = "-- SELECT --";
			if (attribute.emptyValueLabel) {
				emptyValueLabel = attribute.emptyValueLabel;
			}
			return {
				label : emptyValueLabel,
				value : ""
			};
		}
 	});
});
