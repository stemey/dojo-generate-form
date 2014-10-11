define([
    'dojox/mvc/sync',
    "dojo/aspect",
    "dojo/_base/lang",
    "dojo/_base/declare",
    "dijit/Editor",
    "../schema/meta",
    "./mixinTextboxBindings",
    "./dijitHelper",
    "./PrimitiveAttributeFactory"
], function (sync, aspect, lang, declare, Editor, meta, mixinTextboxBindings, dijitHelper, PrimitiveAttributeFactory) {

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

            props.value = at(modelHandle, "message");
            props.state = at(modelHandle, "state");

            var converter = {
                format: function (value) {
                    if (this.target.get("focused")) {
                        throw new "don't update when focus is set";
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
                    //console.log("changed "+widget.get("value"))
                });
            }
            // TODO do we need to remove the aspects on destroy?
            aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
            return widget;
        }
    });
});
