define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./SingleTypePanelWidget"
], function (lang, declare, SingleTypePanelWidget) {
// module: 
//		gform/embedded/EmbeddedAttributeFactory
	return declare([], {
		id: "object",
		// summary:
		//		This AttributeFactory create the widget for single embedded attributes.
		handles: function (attribute, modelHandle) {
			return attribute.type === "object" && attribute.group;
		},
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create: function (attribute, modelHandle, ctx) {
			var panelWidget = new SingleTypePanelWidget({
				"modelHandle": modelHandle,
				"meta": attribute,
				editorFactory: this.editorFactory,
				ctx: ctx
			});

			return panelWidget;

		},
		createModel: function (schema, plainValue) {
			if (plainValue == null && schema.required) {
				plainValue = {};
			}
            var validators = this.editorFactory.getModelValidators(schema);
			var model = this.editorFactory.createGroupModel(schema.group, plainValue);
            model.validators=validators;
			model.required = schema.required === true;
			return model;
		}

	});
});
