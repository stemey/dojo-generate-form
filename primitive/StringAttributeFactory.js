define([
	'dojox/mvc/sync',
	"dojo/_base/lang",
	"dojo/aspect",
	"../model/StringModel",
	"./PrimitiveAttributeFactory",
	"dojo/_base/declare",
	"./ValidationTextBox",
	"../schema/meta",
	"./mixinTextboxBindings",
	"./dijitHelper"
], function (sync, lang, aspect, StringModel, PrimitiveAttributeFactory, declare, TextBox, meta, mixinTextboxBindings, dijitHelper) {

	return declare([PrimitiveAttributeFactory], {
		id: "string",
		alwaysUseInvalidMessage: true,
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		createModel: function (meta) {
			var validators = this.editorFactory.getModelValidators(meta);
			var model = new StringModel({
				validators: validators,
				required: meta.required === true,
				alwaysUseInvalidMessage: true,
				schema: meta
			});
			return model;
		},
		create: function (attribute, modelHandle) {

			var props = {};
			var width = null;
			if (attribute.width) {
				width = attribute.width + "px";
			} else if (attribute.maxLength) {
				width = attribute.maxLength + "em";
			}
			if (width) {
				props.style = {width: width};
			}
			mixinTextboxBindings(modelHandle, props);
			dijitHelper.copyProperty("pattern", attribute, props);
			dijitHelper.copyDijitProperties(attribute, props);
			var widget = new TextBox(props);
			widget.own(aspect.after(widget, "_onBlur", function() {
				modelHandle.onTouch();
				if (attribute.intermediateChanges) {
					// need to validate
					modelHandle.onChange(true);
				}
			}));
			sync(modelHandle, "disabled", widget, "disabled",{});
			return widget;

		}


	});
});
