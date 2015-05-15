define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "./SingleTypePanelWidget",
    "./OptionalSingleTypePanelWidget"
], function (lang, declare, SingleTypePanelWidget, OptionalSingleTypePanelWidget) {
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
            var panelWidget;
			if (attribute.required) {
                panelWidget = new SingleTypePanelWidget({
                    "modelHandle": modelHandle,
                    "meta": attribute,
                    editorFactory: this.editorFactory,
                    ctx: ctx
                });
            } else {
                panelWidget = new OptionalSingleTypePanelWidget({
                    "modelHandle": modelHandle,
                    "meta": attribute,
                    editorFactory: this.editorFactory,
                    ctx: ctx
                });

            }

            return panelWidget;

        },
        getPreferredDecorator: function (attribute) {
            return !attribute.required ? "none" : null;
        },
        createModel: function (schema) {
            var validators = this.editorFactory.getModelValidators(schema);
            var model = this.editorFactory.createGroupModel(schema.group);
            model.validators = validators;
            model.required = schema.required === true;
            return model;
        }

    });
});
