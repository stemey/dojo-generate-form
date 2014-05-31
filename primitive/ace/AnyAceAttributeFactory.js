define([
    "dojo/_base/declare",
    "./AceTextAttributeFactory",
    "../../converter/anyToTextConverter"
], function (declare, AceTextAttributeFactory, anyToTextConverter) {

    return declare([AceTextAttributeFactory], {
        id: "anyAce",
        handles: function (attribute) {
            return attribute.type === "any";
        },
        addProps: function (props) {
            if (!props.mode) {
                props.mode = "ace/mode/json";
            }
        },
        getConverter: function (attribute, ctx) {
            if (attribute.converter) {
                return this.editorFactory.getConverter(attribute, ctx);
            } else {
                return anyToTextConverter;
            }
        }

    });

});
