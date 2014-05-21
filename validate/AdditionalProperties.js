define([
    "dojo/_base/lang",
    "dojo/i18n!../nls/validate",
    "../schema/meta"
], function (lang, nls, metaHelper) {


    return function (additionalProperties) {
        var attributeCode = additionalProperties.code || "additionalProperties";
        return  function (modelHandle) {
            // TODO currently only handles one unique property
            var plainValue = modelHandle.getModelByPath(attributeCode).getPlainValue();
            var errors = [];
                if (plainValue) {
                var attributes = metaHelper.collectAttributes(modelHandle.meta);
                var wrongAttributes = attributes.filter(function (attribute) {
                    return attribute.code in plainValue && attribute.code!=attributeCode;
                });
                if (wrongAttributes.length > 0) {
                    var msg = lang.replace(nls.attributesNotAllowed, {attributeList: wrongAttributes.map(function (a) {
                        return a.label || a.code;
                    }).join(",")});
                    errors.push({path: attributeCode, message: msg});
                }
            }
            return errors;
        };
    };


});

