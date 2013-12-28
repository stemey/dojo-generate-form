define([
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/_base/declare",
	"dijit/form/SimpleTextarea",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"
], function (lang, aspect, declare, SimpleTextarea, meta, mixinTextboxBindings, dijitHelper, PrimitiveAttributeFactory) {

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
		}
	});
});
