define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select",//
"../meta"//
], function(array, lang, declare, at, Select, meta) {

	return declare("app.SelectAttributeFactory", [], {

		handles : function(attribute) {
			var values = meta.getTypeAttribute(attribute,"values");	
			return !attribute.array && values != null &&values.length>0;
		},
		create : function(attribute, modelHandle) {
			var options = [];
			for ( var key in attribute.values) {
				var value = attribute.values[key];
				options.push({
					label : value,
					value : value
				});
			}
			options.push({
				label : "null",
				value : "null"
			})

			var valueBinding = at(modelHandle, attribute.code).transform({
				format : function(value) {
					return value == null ? "null" : value;
				},
				parse : function(value) {
					if (value == "null") {
						return null;
					} else {
						return value;
					}
				}
			});

			var select = new Select({
				"value" : valueBinding,
				options : options,
				style:"width:200px;"
			});
			if (options.length > 0) {
				modelHandle.set(attribute.code, options[0].value);
			}
			return select;

		}
	})
});
