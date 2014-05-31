define([
    "dojo/aspect",
    "dojo/_base/lang",
    "dojo/_base/declare",
    "dijit/form/Textarea",
    "../schema/meta",
    "dojox/mvc/at",
    "./dijitHelper",
    "./PrimitiveAttributeFactory"
], function (aspect, lang, declare, Textarea, meta, at, dijitHelper, PrimitiveAttributeFactory) {

    return declare([PrimitiveAttributeFactory], {
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
            aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
            return widget;
        }
    });
});
