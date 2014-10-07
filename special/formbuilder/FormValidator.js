define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "../../schema/meta"
], function (lang, declare, metaHelper) {


    return declare("gform.special.formbuilder.FormValidator", [], {
        constructor: function (form) {
            this.form = form;
        },
        findUnmappedAttributes: function (attributes, codes) {
            var changes = {};
            codes.forEach(function (code) {
                changes[code] = -1;
            });
            attributes.forEach(function (attribute) {
                var e = changes[attribute.code];
                if (e) {
                    changes[attribute.code] = 0;
                } else {
                    changes[attribute.code] = 1;
                }
            });
            return  Object.keys(changes).filter(function (key) {
                return changes[key] === 1;
            });

        },
        validate: function (modelHandle, force) {
            if (!force) {
                return [];
            }
            var attributesModel = modelHandle.getModelByPath("attributes");
            var group = modelHandle.getModelByPath("group").getPlainValue();
            if (group === null) {
                return[];
            }
            var actualAttributes = metaHelper.collectAttributes(group);

            var unmappedAttributes = this.findUnmappedAttributes(attributesModel.getPlainValue(), actualAttributes);


            var errors = [];
            var msg;
            if (unmappedAttributes.length > 0) {
                msg = lang.replace("the attributes {codes} are not mapped.", {codes: unmappedAttributes.join(", ")});
                errors.push({path: "", message: msg});
            } else {
                var uniqueAttributes = {};
                actualAttributes.forEach(function (attribute) {
                    if (attribute) {
                        var count = uniqueAttributes[attribute] || 0;
                        uniqueAttributes[attribute] = ++count;
                    }
                });
                var duplicateAttributes = Object.keys(uniqueAttributes).filter(function (code) {
                    return uniqueAttributes[code] > 1;
                });
                if (Object.keys(duplicateAttributes).length > 0) {
                    msg = lang.replace("{codes} are mapped twice.", {codes: duplicateAttributes.join(", ")});
                    errors.push({path: "", message: msg});
                }
            }


            return errors;
        }
    });


});
