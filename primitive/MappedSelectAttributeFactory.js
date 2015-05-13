define([
	'dojo/when',
	"../model/MappedSelectModel",
	"dojo/_base/declare",
	"dojox/mvc/at",
	"dijit/form/Select",
	"./_MappedSelectAttributeFactoryBase"
], function (when, MappedSelectModel, declare, at, Select, _MappedSelectAttributeFactoryBase) {

	return declare([ _MappedSelectAttributeFactoryBase ], {
		id: "mapped-select",
		handles: function (attribute) {
			//var mapped_values=attribute.mapped_values;
			return attribute.type === "string" && attribute.mapped_attribute && attribute.mapped_values;
		},

		create: function (attribute, modelHandle, ctx) {
			var initialValue = modelHandle.getPlainValue();
			var select = new Select({
				value: at(modelHandle, "value"),
				options:[],
				maxHeight: -1
			});
			var options = this._createMappedOptions(modelHandle, attribute);
			when(options).then(function(newOptions) {
				if (!initialValue && newOptions.length>0) {
					initialValue = newOptions[0].value;

				}
				modelHandle.options=newOptions;
				select.set("options", modelHandle.options);
				modelHandle.update(initialValue);
			});

			modelHandle.watch("options", function () {
				select.set("options", modelHandle.options);
			});


			return select;
		},


		createModel: function (meta) {
			var validators = this.editorFactory.getModelValidators(meta);
			var mappedValues = {};
			for (var key in meta.mapped_values) {
				mappedValues[key] = meta.mapped_values[key].map(function (e) {
					if (e.value) {
						return e;
					} else {
						return {value: e, label: e};
					}
				});
			}
			var model = new MappedSelectModel({schema: meta, mappedValues: mappedValues, mappedAttribute: meta.mapped_attribute, validators: validators, required: meta.required === true});
			return model;
		}

	});
});
