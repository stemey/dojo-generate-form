define([
    "../model/PrimitiveModel",
    "dojo/_base/declare"
], function (PrimitiveModel, declare) {
    // module:
    //		gform/model/MappedSelectModel

    return declare("gform.model.SelectModel", [PrimitiveModel], {
        options: [],
        store: null,
        isValid: function (value) {
            if (this.parent == null) {
                return true;
            }

            if(this.store && this.options.length == 0) /* if store is provided, validate after */ 
                return true;                    /* it's loaded */

            return this.options.some(function (e) {
                return e.value === value;
            });

        },
        getDefault: function () {
            if (this.options.length > 0) {
                return this.options[0].value;
            } else {
                return null;
            }
        },
        _valueSetter: function (value) {
            if (this.isValid(value)) {
                this._changeAttrValue("value", value);
            } else if (this.required) {
                this._changeAttrValue("value", this.getDefault());
            } else {
                this._changeAttrValue("value", null);
            }
        }
    });
});
