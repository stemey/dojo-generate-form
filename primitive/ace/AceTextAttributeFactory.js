define([
    'dojo/_base/lang',
    'dojo/aspect',
    './AceEditor',
    "dojo/_base/declare",
    "../../schema/meta",
    "dojox/mvc/at",
    "../PrimitiveAttributeFactory",
    'ace/ext/language_tools'
], function (lang, aspect, AceEditor, declare, meta, at, PrimitiveAttributeFactory) {

    return declare([PrimitiveAttributeFactory], {
        id: "acetext",
        handles: function (attribute) {
            return meta.isType(attribute, "string") && !attribute.array;
        },

        create: function (attribute, modelHandle) {
            var props = {};
            props.value = at(modelHandle, "value");
            props.mode = attribute.mode;
            props.options={};
            props.options.enableBasicAutocompletion=!!attribute.autoComplete;
            var widget = new AceEditor(props);
            aspect.after(widget, "startup", lang.hitch(this, "startup", widget, attribute));
            return widget;
        },
        startup: function (widget, attribute) {
            var height = attribute.height || "100px";
            var width = attribute.width || "100%";
            widget.domNode.style.height = height;
            widget.domNode.style.width = width;

        }
    });
});
