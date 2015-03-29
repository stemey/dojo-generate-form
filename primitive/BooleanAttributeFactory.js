define([
    "dojo/_base/declare",//
    "dojo/aspect",//
    "dojox/mvc/at",//
    "dijit/form/CheckBox",//
    "../schema/meta",//
    "./dijitHelper",//
    "../model/BooleanModel"
], function (declare, aspect, at, CheckBox, meta, dijitHelper, BooleanModel) {

    return declare([], {
        id: "boolean",
        preferredDecorator:null,
        handles: function (attribute) {
            return meta.isType(attribute, "boolean") && !attribute.array;
        },
        create: function (attribute, modelHandle) {
            if (!modelHandle) {
                throw new Error(" attribute " + attribute.code + " was not initialized");
            }
            var box = new CheckBox({
                "checked": at(modelHandle, "value"),
                "disabled": attribute.disabled === true
            });
            // remove errors when value changes because this select does not validate.
            aspect.after(box, "onChange", function () {
                modelHandle.set("message", null);
                modelHandle.set("valid", true);
            });
            return box;

        },
        getPreferredDecorator: function() {
            return this.preferredDecorator;
        },
        createModel: function (meta) {
            var model = new BooleanModel({schema: meta});
			return model;
        }
    });
});
