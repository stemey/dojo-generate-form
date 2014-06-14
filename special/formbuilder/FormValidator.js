define([
    "dojo/_base/lang",
    "../../schema/meta"
], function (lang, metaHelper) {


    return function (form) {
        function findUnmappedAttributes(attributes,codes) {
            var changes = {};
            codes.forEach(function(code) {
                changes[code]=-1;
            });
            attributes.forEach(function(attribute) {
                var e = changes[attribute.code];
                if (e) {
                    changes[attribute.code]=0;
                } else {
                    changes[attribute.code]=1;
                }
            });
            return  Object.keys(changes).filter(function(key) {
                return changes[key]===1;
            });

        }
        return  function (modelHandle, force) {
            var attributesModel = modelHandle.getModelByPath("attributes");
            var group = modelHandle.getModelByPath("group").getPlainValue();
            if (group===null ) {
                return[];
            }
            var actualAttributes = metaHelper.collectAttributes(group);

            var unmappedAttributes = findUnmappedAttributes(attributesModel.getPlainValue(),actualAttributes);


            var errors = [];
            if (unmappedAttributes.length>0) {
                var msg = lang.replace("the attributes {codes} are not mapped.",{codes:unmappedAttributes.join(", ")});
                errors.push({path:"",message:msg});
            } else {
                var uniqueAttributes={};
                actualAttributes.forEach(function(attribute) {
                    if (attribute) {
                        var count = uniqueAttributes[attribute] || 0;
                        uniqueAttributes[attribute]=++count;
                    }
                });
                var duplicateAttributes = Object.keys(uniqueAttributes).filter(function(code) {
                    return uniqueAttributes[code]>1;
                });
                if (Object.keys(duplicateAttributes).length>0) {
                    var msg = lang.replace("{codes} are mapped twice.",{codes:duplicateAttributes.join(", ")});
                    errors.push({path:"",message:msg});
                }
            }


            return errors;
        };
    };


});
