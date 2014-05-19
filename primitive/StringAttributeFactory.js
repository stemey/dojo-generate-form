define([
	"dojo/_base/lang",
	"dojo/aspect",
	"../model/StringModel",
	"./PrimitiveAttributeFactory",
	"dojo/_base/declare",
	"./ValidationTextBox",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper"
], function (lang, aspect, StringModel, PrimitiveAttributeFactory, declare, TextBox, meta, mixinTextboxBindings, dijitHelper) {

	return declare([PrimitiveAttributeFactory], {
		id: "string",
		alwaysUseInvalidMessage: true,
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		createModel: function (meta, plainValue) {
			var validators = this.editorFactory.getModelValidators(meta);
			var model = new StringModel({validators: validators, required: meta.required === true, alwaysUseInvalidMessage: true, schema: meta});
			model.update(plainValue);
			return model;
		},
		create: function (attribute, modelHandle) {

			var props = {
			};
			mixinTextboxBindings(modelHandle, props);
			dijitHelper.copyProperty("pattern", attribute, props);
			dijitHelper.copyDijitProperties(attribute, props);
			var widget = new TextBox(props);
			aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
			return widget;

		}


	});
});
