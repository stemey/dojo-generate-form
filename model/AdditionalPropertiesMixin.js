define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "../schema/meta"
], function (lang, declare, metaHelper) {
    // module:
    //		gform/model/AdditionalPropertiesMixin


    return declare("gform.model.AdditionalPropertiesMixin", [], {
        _getAdditionalAttributeCode: function () {
            return this.schema && this.schema.additionalProperties ? this.schema.additionalProperties.code || "additionalProperties" : null;
        },
        _getAttributeCodes: function () {
            // get all attributes (for MultiObject this will be a union of all schemas)
            var attributes = metaHelper.collectAttributes(this.schema);
            return attributes.map(function (a) {
                return a.code;
            });

        },
        transformIn: function (value) {
            var additionalAttribute = this._getAdditionalAttributeCode();
            if (value && additionalAttribute) {
                var newValue = {};
                lang.mixin(newValue, value);
                var additionalProperties = {};
                var attributeCodes = this._getAttributeCodes();
                Object.keys(newValue).forEach(function (key) {
                    if (attributeCodes.indexOf(key) < 0) {
                        additionalProperties[key] = newValue[key];
                        delete newValue[key];
                    }
                }, this);
                newValue[additionalAttribute] = additionalProperties;
                return newValue;
            } else {
                return value;
            }
        },
        transformOut: function (value) {
            var additionalAttribute = this._getAdditionalAttributeCode();
            if (additionalAttribute) {
                var newValue = {};
                lang.mixin(newValue, value);
                lang.mixin(newValue, value[additionalAttribute]);
                delete newValue[additionalAttribute];
                return newValue;
            } else {
                return value;
            }
        }
    });
});
