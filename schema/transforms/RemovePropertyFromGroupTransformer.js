define(['dojo/_base/lang', 'dojo/_base/declare'],
    function (lang, declare) {
// module:
//		gform/schema/Transformer

        return declare('RemovePropertyFromGroupTransformer', [], {
            constructor: function (kwArgs) {
                lang.mixin(this, kwArgs);
            },
            deleteCodes: [],
            execute: function (group) {
                var newE = {};
                lang.mixin(newE, group);
                var newAttributes = [];
                group.attributes.forEach(function (prop, idx) {
                    if (this.deleteCodes.indexOf(prop.code) < 0) {
                        newAttributes.push(prop);
                    }
                }, this);
                newE.attributes = newAttributes;
                return newE;
            }

        });

    })
;