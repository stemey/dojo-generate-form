define([
	'../model/MappedSelectModel',
	"dojo/_base/declare",
	"dojox/mvc/at",
	"dijit/form/Select",
	"./_MappedSelectAttributeFactoryBase",
	"./dijitHelper",
	"dojo/text!./mapped_select.json",
	"dojo/text!./mapped_select_doc.json"
], function (MappedSelectModel, declare, at, Select, _MappedSelectAttributeFactoryBase, dijitHelper, example, exampleForDoc) {

	return declare([ _MappedSelectAttributeFactoryBase ], {

		handles: function (attribute) {
			//var mapped_values=attribute.mapped_values;
			return attribute.type === "mapped-select";
		},

		create: function (attribute, modelHandle) {
			var options = this._createMappedOptions(modelHandle, attribute);

			var select = new Select({
				value: at(modelHandle, "value"),
				options: modelHandle.options,
				maxHeight: -1
			});

			modelHandle.watch("options", function () {
				select.set("options", modelHandle.options);
			});


			return select;
		},


		createModel: function (meta, plainValue) {
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
			var model = new MappedSelectModel({mappedValues: mappedValues, mappedAttribute: meta.mapped_attribute, validators: validators, required: meta.required === true});
			model.update(plainValue);
			return model;
		},
		getSchema: function () {
			var schema = {};
			schema["id"] = "mapped-select";
			var properties = {};
			schema["description"] = "This is a select field whose options depend on the value of another attribute. The options are specified as an array of label value pairs and or values. It is based on 'dijit.form.Select'";
			schema["example"] = example;
			schema["exampleForDoc"] = exampleForDoc;
			schema.properties = properties;
			properties.type = {type: "string", required: true, "enum": ["string"]};
			properties.mapped_values = dijitHelper.getMappedValuesSchema();
			properties.mapped_attribute = {type: "string", description: "the name of a sibling property"};
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required", properties);
			dijitHelper.addSchemaProperty("promptMessage", properties);
			dijitHelper.addSchemaProperty("placeHolder", properties);
			dijitHelper.addSchemaProperty("invalidMessage", properties);
			return schema;
		}

	});
});
