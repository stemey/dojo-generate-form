define([
	'../../model/ObjectModel',
	"dojo/_base/declare",
	"./AceTextAttributeFactory",
	"../../converter/anyToTextConverter"
], function (ObjectModel, declare, AceTextAttributeFactory, anyToTextConverter) {

	return declare([AceTextAttributeFactory], {
		id: "anyAce",
		handles: function (attribute) {
			return attribute.type === "any";
		},
		addProps: function (props) {
			if (!props.mode) {
				props.mode = "ace/mode/json";
			}
		},
		getConverter: function (attribute, ctx) {
			if (attribute.converter) {
				return this.editorFactory.getConverter(attribute, ctx);
			} else {
				return anyToTextConverter;
			}
		},
		createModel: function (meta) {
			var validators = this.editorFactory.getModelValidators(meta);
			var model = new ObjectModel({
				schema: meta, validators: validators, required: meta.required === true
			});
			return model;
		}

	});

});
