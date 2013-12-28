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
		}
	});
});
