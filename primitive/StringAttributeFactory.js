define([
	"dojo/_base/lang",
	"dojo/aspect",
	"../model/StringModel",
	"./PrimitiveAttributeFactory",
	"dojo/_base/declare",
	"./ValidationTextbox",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper"
], function (lang, aspect, StringModel, PrimitiveAttributeFactory, declare, TextBox, meta, mixinTextboxBindings, dijitHelper) {

	return declare([PrimitiveAttributeFactory], {
		id: "string",
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		createModel: function (meta, plainValue) {
			var validators = this.editorFactory.getModelValidators(meta);
			var model = new StringModel({validators: validators, required: meta.required === true});
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

		},
		getSchema: function () {
			var schema = {};
			schema["id"] = "string";
			schema["description"] = "This is a textfield based on 'dijit.form.ValidationTextBox'";
			schema["example"] = dojo.toJson({code: 'name', type: 'string'}, true);
			var properties = {};
			properties.type = {type: "string", required: true, "enum": ["string"]};
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required", properties);
			dijitHelper.addSchemaProperty("maxLength", properties);
			dijitHelper.addSchemaProperty("missingMessage", properties);
			dijitHelper.addSchemaProperty("promptMessage", properties);
			dijitHelper.addSchemaProperty("placeHolder", properties);
			dijitHelper.addSchemaProperty("invalidMessage", properties);
			dijitHelper.addSchemaProperty("pattern", properties);
			dijitHelper.addSchemaProperty("properCase", properties);
			dijitHelper.addSchemaProperty("upperCase", properties);

			schema.properties = properties;
			return schema;
		}


	})
});
