define(
    [
        "dojo/aspect",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "./NumberTextBox",
        "../schema/meta",
        "./dijitHelper",
        "./mixinNumberboxBindings",
        "./PrimitiveAttributeFactory"
    ],
    function (aspect, lang, declare, NumberTextBox, meta, dijitHelper, mixinNumberboxBindings, PrimitiveAttributeFactory) {

        return declare([PrimitiveAttributeFactory],
            {
                id: "number",
                alwaysUseInvalidMessage: true,
                handles: function (attribute) {
                    return meta.isType(attribute, "number");
                },
                create: function (attribute, modelHandle) {
                    var constraints = {};
                    var props = {
                        constraints: constraints
                    };
                    mixinNumberboxBindings(modelHandle, props);

                    dijitHelper.copyProperty("constraints", attribute, props);
                    dijitHelper.copyDijitProperties(attribute, props);
                    if (attribute.numberFormat && attribute.numberFormat !== "") {
                        constraints.pattern = attribute.numberFormat;
                    }
                    dijitHelper.copyProperty("places", attribute, constraints);
                    dijitHelper.copyProperty("min", attribute, constraints);
                    dijitHelper.copyProperty("max", attribute, constraints);
                    var widget = new NumberTextBox(props);
                    this.addDijitValidation(modelHandle,widget);
                    aspect.after(widget, "_onBlur", lang.hitch(modelHandle, "onTouch"));
                    return widget;

                }
            });
    });
