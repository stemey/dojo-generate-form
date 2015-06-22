define([
        'dojo/_base/lang', 'dojo/_base/declare'],
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
                    if (e.attributes) {
                        newE.attributes=this.fixAttributes(e);
                    } else if (e.groups) {
                        newE.groups = this.execute(e.groups);
                    }
                    newArray.push(newE);
                }, this);
                return newArray;
            },
            fixAttributes: function(e) {
                var newAttributes = [];
                e.attributes.forEach(function (group, idx) {
                    if (this.deleteCodes.indexOf(group.code)<0) {
                        newAttributes.push(group);
                    }
                }, this);
                return newAttributes;
            }

        });

    })
;