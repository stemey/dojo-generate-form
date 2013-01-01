define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select",//
"../meta"//
], function(array, lang, declare, at, Select, meta) {

	return declare("app.SelectAttributeFactory", [], {
		handles: function(attribute) {
			var mapped_values=meta.getTypeAttribute("mapped_values");
			return !attribute.array && mapped_values && mapped_values.length>0;
		},
		create : function(attribute, modelHandle) {
			var options = [];
			var mapped_values=meta.getTypeAttribute("mapped_values");
			var onMappedAttributeChanged = function(e) {
				options = [];
				var mappedValue = modelHandle.get(meta.getTypeAttribute(attribute,"mapped_attribute"));
				var values = mapped_values[mappedValue].elements;
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
			modelHandle.watch(meta.getTypeAttribute(attribute,"mapped_attribute"),
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
