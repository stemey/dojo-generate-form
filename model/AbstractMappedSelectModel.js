define([
    "dojo/_base/lang",
    "../model/SelectModel",
    "dojo/_base/declare"
], function (lang, SelectModel, declare) {
    // module:
    //		gform/model/MappedSelectModel

    return declare("gform.model.MappedSelectModel", [SelectModel], {
        _parentSetter: function (parent) {
            this._changeAttrValue("parent", parent);
            var cb = lang.hitch(this, "_onMappedAttributeChanged");
            this.startListening(parent, cb);
        },
        _initOptions: function () {
            var newValues = this.getMappedValues();
            if (newValues) {
                this.set("options", newValues);
            } else if (this.isRequired()) {
                this.set("options", [
                    {label: "", value: null}
                ]);
            } else {
                this.set("options", []);

            }
        },
        getMappedValues: function(value) {
            return [];
        },
        _onMappedAttributeChanged: function () {
            this._initOptions();
            if (!this.isValid(this.value)) {
                if (this.isRequired()) {
                    this._changeAttrValue("value", this.getDefaultValue());
                } else {
                    this._changeAttrValue("value", null);
                }
            }
        }
    });
});
