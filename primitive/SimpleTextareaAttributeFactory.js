define([
	"dojo/aspect",
	"dojo/_base/declare",
	"dijit/form/SimpleTextarea",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"
], function (aspect, declare, SimpleTextarea, meta, mixinTextboxBindings, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "simpletextarea",
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},

		create: function (attribute, modelHandle) {
			var props = {};
			mixinTextboxBindings(modelHandle, props);
			dijitHelper.copyDijitProperties(attribute, props);
			dijitHelper.copyProperty("cols", attribute, props);
			dijitHelper.copyProperty("rows", attribute, props);
			var widget = new SimpleTextarea(props);
			aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
			return widget;
		},
		getSchema: function () {
			var schema = {};
			schema["id"] = "string";
			schema["description"] = "This is a textarea based on 'dijit.form.SimpleTextarea'";
			schema["example"] = dojo.toJson({editor: 'simpletextarea', code: 'name', type: 'string', cols: 30, rows: 4}, true);
			var properties = {};
			properties.type = {type: "string", required: true, "enum": ["string"]};
			properties.cols = {type: "number", places: 0, description: "the number of characters per line"}
			properties.rows = {type: "number", places: 0, description: "the number of rows o text"}
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
