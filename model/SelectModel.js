define([
    "../model/PrimitiveModel",
    "dojo/_base/declare"
], function (PrimitiveModel, declare) {
    // module:
    //		gform/model/MappedSelectModel

    return declare("gform.model.SelectModel", [PrimitiveModel], {
        options: [],
        isValid: function (value) {
            return this.options.some(function (e) {
                return e.value === value;
            });

        },
        getDefaultValue: function () {
            var defaultValue = this.inherited(arguments);
            if (defaultValue === null && this.options.length > 0) {
                defaultValue = this.options[0].value;
            }
            return defaultValue;
        },
        _valueSetter: function (value) {
            if (this.isValid(value)) {
                this._changeAttrValue("value", value);
            } else if (this.isRequired()) {
                this._changeAttrValue("value", this.getDefaultValue());
            } else {
                this._changeAttrValue("value", null);
            }
        }
    });
});
