define(['dojo/when',
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/i18n!../nls/messages"
], function (when, array, lang, declare, messages) {

	return declare([], {

		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},

		_onMappedAttributeChanged: function (modelHandle, select, attribute) {
			var value = this._createMappedOptions(modelHandle, attribute);
			when(value).then(function(newOptions){
				//var value =
				var value = select.get("value");
				select.removeOption(select.get("options"));
				select.addOption(newOptions);
				select.set("value", value);
			})
		},

		_watchMappedAttribute: function (modelHandle, attribute, select) {
			modelHandle.watchParent(attribute.mapped_attribute,
				lang.hitch(this, "_onMappedAttributeChanged", modelHandle, select, attribute));
		},

		_createMappedOptions: function (modelHandle, attribute) {
			var mappedValue = modelHandle.getParent(attribute.mapped_attribute);
			var values = attribute.mapped_values[mappedValue];

			var options = [];
			array.forEach(values, function (value) {
				if (value.label && value.value) {
					options.push({
						label: value.label,
						value: value.value
					});
				} else {
					options.push({
						label: value,
						value: value
					});
				}
			}, this);

			// at least the empty option needs to be added
			if (options.length == 0 && !attribute.array) {
				options.push({label: messages["emptySelectLabel"], value: ""});
			}

			return options;
		}


	});
});
