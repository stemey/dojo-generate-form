define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select",//
"../meta"
], function(array, lang, declare, at, Select, meta) {

	return declare("app.SelectAttributeFactory", [], {
		handles: function(attribute) {
			var mapped_values=attribute.mapped_values;
			return !attribute.array && mapped_values;
		},
		create : function(attribute, modelHandle,resolver) {
			var options = [];
			var mapped_values=attribute.mapped_values;
			var onMappedAttributeChanged = function(e) {
				options = [];
				var mappedValue = resolver.get(attribute.mapped_attribute);
				var values = mapped_values[mappedValue];
				var valueValid=false;
				for ( var key in values) {
					var value = values[key];
					if (value==modelHandle.value) {
						valueValid=true;
					}
					options.push({
						label : value,
						value : value
					});
				}
				select.set("options", options);
				if (!valueValid) {
					modelHandle.set("value",options[0].value);
				}
				
			};
			resolver.watch(attribute.mapped_attribute,
					onMappedAttributeChanged);

			var select = new Select({
				"value" : at(modelHandle, "value"),
				options : options,
				style : "width:200px;"

			});
			onMappedAttributeChanged();
			return select;

		}
	})
});
