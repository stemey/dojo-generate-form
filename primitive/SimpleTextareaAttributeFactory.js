define([
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/_base/declare",
	"dijit/form/SimpleTextarea",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper",
	"./StringAttributeFactory"
], function (lang, aspect, declare, SimpleTextarea, meta, mixinTextboxBindings, dijitHelper, StringAttributeFactory) {

	return declare([StringAttributeFactory], {
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
			widget.own(aspect.after(widget, "_onBlur", function () {
				modelHandle.onTouch();
				if (attribute.intermediateChanges) {
					// need to validate
					modelHandle.onChange(true);
				}
			}));
			return widget;
		}
	});
});
