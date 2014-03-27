define(['dojo/_base/lang', 'dojo/_base/declare'],
    function (lang, declare) {
// module:
//		gform/schema/Transformer

        return declare('RemovePropertyFromGroupsTransformer', [], {
            constructor: function (kwArgs) {
                lang.mixin(this, kwArgs);
            },
            deleteCodes: [],
            execute: function (groups) {
                var newArray = [];
                groups.forEach(function (e) {
                    var newE = {};
                    lang.mixin(newE, e);
                    var newAttributes = [];
                    e.attributes.forEach(function (group, idx) {
                        if (this.deleteCodes.indexOf(group.code)<0) {
                            newAttributes.push(group);
                        }
                    }, this);
                    newE.attributes = newAttributes;
                    newArray.push(newE);
                }, this);
                return newArray;
            }

        });

    })
;