define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select"//
], function(array, lang, declare, at, Select) {

	return declare("app.SelectAttributeFactory", [], {

		create : function(attribute, modelHandle) {
			var options = [];
			var onMappedAttributeChanged = function(e) {
				options = [];
				var mappedValue = modelHandle.get(attribute.mapped_attribute);
				var values = attribute.mapped_values[mappedValue].elements;
				for ( var key in values) {
					var value = values[key];
					options.push({
						label : value,
						value : value
					});
				}
				select.set("options", options);
				if (options.length > 0) {
					modelHandle.set(attribute.code, options[0].value);
				}
			};
			modelHandle.watch(attribute.mapped_attribute,
					onMappedAttributeChanged);

			var select = new Select({
				"value" : at(modelHandle, attribute.code),
				options : options,
				style : "width:200px;"

			});
			onMappedAttributeChanged();
			return select;

		}
	})
});
