define([
    "dojo/_base/declare",
    "./dijitHelper",
    "./PrimitiveAttributeFactory",
    "dijit/form/Textarea",
    "dojox/mvc/at",
    "dojo/aspect",
    "dojo/_base/lang"
], function (declare, dijitHelper, PrimitiveAttributeFactory, Textarea, at, aspect, lang) {

    return declare([PrimitiveAttributeFactory], {
        id: "anyTextArea",
        handles: function (attribute) {
            return attribute.type === "any";
        },
        create: function (attribute, modelHandle, ctx) {
            var props = {};
            var converter = this.editorFactory.getConverter(attribute, ctx);
             props.value = at(modelHandle, "value").transform(converter);
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
