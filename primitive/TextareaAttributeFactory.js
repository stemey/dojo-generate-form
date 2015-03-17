define([
	"dojo/aspect",
	"dojo/_base/declare",
	"dijit/form/Textarea",
	"../schema/meta",
	"dojox/mvc/at",
	"./dijitHelper",
	"./StringAttributeFactory"
], function (aspect, declare, Textarea, meta, at, dijitHelper, StringAttributeFactory) {

	return declare([StringAttributeFactory], {
		id: "textarea",
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		getConverter: function (attribute, ctx) {
			if (attribute.converter) {
				return this.editorFactory(attribute, ctx);
			} else {
				return null;
			}
		},
		create: function (attribute, modelHandle, ctx) {
			var props = {};
			props.value = at(modelHandle, "value");
			var converter = this.getConverter(attribute, ctx);
			if (converter) {
				props.value.transform(converter);
			}
			props.state = at(modelHandle, "state");
			props.message = at(modelHandle, "message");
			dijitHelper.copyDijitProperties(attribute, props);
			dijitHelper.copyProperty("cols", attribute, props);
			var widget = new Textarea(props);

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
