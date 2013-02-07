define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select",//
"../getStateful",//
"../meta"//
], function(array, lang, declare, at, Select, getStateful, meta) {

	return declare("app.SelectAttributeFactory", [], {

		handles : function(attribute) {
			var values = meta.getTypeAttribute(attribute,"values");	
			return !attribute.array && values != null &&values.length>0;
		},
		create : function(attribute, modelHandle) {
			var options = [];
			if (!attribute.required) {
				var emptyValueLabel = "-- SELECT --";
				if (attribute.emptyValueLabel) {
					emptyValueLabel = attribute.emptyValueLabel;
				}
				options.push({
					label : emptyValueLabel,
					value : ""
				});
			}
			for ( var key in attribute.values) {
				var value = attribute.values[key];
				options.push({
					label : value,
					value : value
				});
			}

			var valueBinding = at(modelHandle, "value").transform({
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
			});

			var select = new Select({
				"value" : valueBinding,
				options : options,
				style:"width:200px;"
			});
			if (false && options.length > 0) {
				modelHandle.set("value", options[0].value);
			}
			return select;

		}
	});
});
