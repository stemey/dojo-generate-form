define([
    '../Editor',
    "dojo/_base/lang",
    "dojo/_base/declare",
    "./SingleTypePanelWidget",
    "./OptionalSingleTypePanelWidget"
], function (Editor, lang, declare, SingleTypePanelWidget, OptionalSingleTypePanelWidget) {
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
            var Widget = attribute.required ? SingleTypePanelWidget : OptionalSingleTypePanelWidget;
            if (attribute.layout && attribute.required) {
                return new Editor(
                    {
                        doLayout: true,
                        "modelHandle": modelHandle,
                        "meta": attribute.group,
                        editorFactory: this.editorFactory,
                        "ctx": ctx
                    });
            } else {
                var panelWidget = new Widget({
                    "modelHandle": modelHandle,
                    "meta": attribute,
                    editorFactory: this.editorFactory,
                    ctx: ctx
                });
                return panelWidget;
            }

        },
        getPreferredDecorator: function (attribute) {
            return !attribute.required ? "none" : null;
        }
        ,
        createModel: function (schema) {
            var validators = this.editorFactory.getModelValidators(schema);
            var model = this.editorFactory.createGroupModel(schema.group);
            model.validators = validators;
            model.required = schema.required === true;
            return model;
        }

    });
});
