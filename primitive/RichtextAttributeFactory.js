define([
	"dojo/aspect",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dijit/Editor",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"
], function (aspect, lang, declare, Editor, meta, mixinTextboxBindings, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "richtext",
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},

		create: function (attribute, modelHandle) {
			var props = {};
            if (attribute.plugins) {
                props.plugins=attribute.plugins;
            }
            if (attribute.extraPlugins) {
                props.plugins=attribute.extraPlugins;
            }
            props.height=attribute.height;
            mixinTextboxBindings(modelHandle, props);
			dijitHelper.copyDijitProperties(attribute, props);
			var widget = new Editor(props);
			aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
			return widget;
		}
	});
});
