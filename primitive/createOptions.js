define([
    "dojo/i18n!../nls/messages"
], function (messages) {


    function _createEmptyOption(attribute) {
        var emptyValueLabel = messages["emptySelectLabel"];
        if (attribute.emptyValueLabel) {
            emptyValueLabel = attribute.emptyValueLabel;
        }
        return {
            label: emptyValueLabel,
            value: ""
        };
    }

    return function (attribute, emptyOptionSupported) {
        var options = [];
        if (emptyOptionSupported && !attribute.required) {
            options.push(_createEmptyOption(attribute));
        }
        for (var key in attribute.values) {
            var value = attribute.values[key];
            if (typeof value === "object") {
                options.push({
                    label: value.label,
                    value: value.value
                });
            } else {
                options.push({
                    label: value,
                    value: value
                });
            }
        }
        return options;
    }
});
