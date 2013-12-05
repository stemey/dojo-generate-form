define([
	"dojo/aspect",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dijit/form/Textarea",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"
], function (aspect, lang, declare, Textarea, meta, mixinTextboxBindings, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "textarea",
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},

		create: function (attribute, modelHandle) {
			var props = {};
			mixinTextboxBindings(modelHandle, props);
			dijitHelper.copyDijitProperties(attribute, props);
			dijitHelper.copyProperty("cols", attribute, props);
			var widget = new Textarea(props);
			aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
			return widget;
		},
		getSchema: function () {
			var schema = {};
			schema["id"] = "string";
			schema["description"] = "This is a textarea based on 'dijit.form.Textarea'";
			schema["example"] = dojo.toJson({editor: 'textarea', code: 'name', type: 'string', cols: 30}, true);
			var properties = {};
			properties.type = {type: "string", required: true, "enum": ["string"]};
			properties.cols = {type: "number", places: 0, description: "the number of characters per line"}
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required", properties);
			dijitHelper.addSchemaProperty("maxLength", properties);
			dijitHelper.addSchemaProperty("missingMessage", properties);
			dijitHelper.addSchemaProperty("promptMessage", properties);
			dijitHelper.addSchemaProperty("placeHolder", properties);

			schema.properties = properties;
			return schema;
		}
	});
});
