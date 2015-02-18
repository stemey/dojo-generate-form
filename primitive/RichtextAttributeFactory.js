define([
	'../model/StringModel',
	'dojox/mvc/sync',
	"dojo/aspect",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dijit/Editor",
	"../schema/meta",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"
], function (StringModel, sync, aspect, lang, declare, Editor, meta, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "richtext",
		handles: function (attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},

		create: function (attribute, modelHandle) {
			var props = {};
			if (attribute.plugins) {
				props.plugins = attribute.plugins;
			}
			if (attribute.extraPlugins) {
				props.extraPlugins = attribute.extraPlugins;
			}
			props.height = attribute.height;

			props.message = at(modelHandle, "message");
			props.state = at(modelHandle, "state");

			var converter = {
				format: function (value) {
					if (this.target.get("focused")) {
						throw new "don't update when focus is set";
					}
					if (value === null || typeof value === "undefined") {
						value = "";
					}
					return value;
				},
				parse: function (value) {
					return value;
				}
			};


			dijitHelper.copyDijitProperties(attribute, props);
			dijitHelper.copyProperty("updateInterval", attribute, props);
			var widget = new Editor(props);
			var liveChanges = props.updateInterval && props.updateInterval >= 0;
			sync(modelHandle, "value", widget, "value", {converter: converter});
			if (liveChanges) {
				aspect.after(widget, "onNormalizedDisplayChanged", function () {
					modelHandle.set("value", widget.get("value"));
				});
			}
			aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
			return widget;
		},
		createModel: function (meta, plainValue) {
			var validators = this.editorFactory.getModelValidators(meta);
			if (!meta.defaultValue) {
				meta.defaultValue = "";
			}
			var model = new StringModel({
				schema: meta,
				alwaysUseInvalidMessage: this.alwaysUseInvalidMessage === true,
				validators: validators,
				required: meta.required === true
			});
			model.update(plainValue,true,false);
			return model;
		}
	});
});
