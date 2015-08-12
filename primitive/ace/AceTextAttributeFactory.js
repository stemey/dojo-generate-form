define([
    'dojo/_base/lang',
    'dojo/aspect',
    './AceEditor',
    "dojo/_base/declare",
    "../../schema/meta",
    "dojox/mvc/sync",
    "../PrimitiveAttributeFactory"
], function (lang, aspect, AceEditor, declare, meta, sync, PrimitiveAttributeFactory) {

    return declare([PrimitiveAttributeFactory], {
        id: "acetext",
        handles: function (attribute) {
            return meta.isType(attribute, "string") && !attribute.array;
        },

        create: function (attribute, modelHandle, ctx) {
            var props = {};
            props.mode = attribute.mode;
            props.options = {};
            props.options.enableBasicAutocompletion = !!attribute.autoComplete;
            this.addProps(props);
            props.style = {};
            if (attribute.height) {
                props.style.height = attribute.height;
            }
            if (attribute.width) {
                props.style.height = attribute.width;
            }
            var widget = new AceEditor(props);
            aspect.after(widget, "startup", lang.hitch(this, "startup", widget, attribute));

            if (attribute.modeAttribute) {
                var modeModel = modelHandle.getModelByPath(attribute.modeAttribute);
                widget.own(aspect.after(modeModel, "onChange", function () {
                    widget.set("mode", modeModel.getPlainValue());
                }));
                widget.set("mode", modeModel.getPlainValue());
            }

            var converter = this.getConverter(attribute, ctx);
            if (converter) {
                widget.own(sync(modelHandle, "value", widget, "value", {converter: this.getConverter(attribute, ctx)}));
            } else {
                widget.own(sync(modelHandle, "value", widget, "value", {}));
            }

            return widget;
        },
        addProps: function (props) {
        },
        getConverter: function (attribute, ctx) {
            return null;
        },
        startup: function (widget, attribute) {
            var height = attribute.height || "100px";
            var width = attribute.width || "100%";
            widget.domNode.style.height = height;
            widget.domNode.style.width = width;

        }
    });
});
