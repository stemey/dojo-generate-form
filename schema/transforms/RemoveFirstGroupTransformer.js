define(['dojo/_base/lang', 'dojo/_base/declare'],
    function (lang, declare) {
// module:
//		gform/schema/Transformer

        return declare('RemoveFirstGroupTransformer', [], {
            constructor: function (kwArgs) {
                lang.mixin(this, kwArgs);
            },
            execute: function (attributes) {
                var newArray = [];
                attributes.forEach(function (e) {
                    if (e.groups && e.code && !e.code.match(/(object|array|map)/)) {
                        var newE = {};
                        lang.mixin(newE, e);
                        var newGroups = [];
                        e.groups.forEach(function (group, idx) {
                            if (idx > 0) {
                                newGroups.push(group);
                            }
                        });
                        newE.groups = newGroups;
                        newArray.push(newE);
                    }
                });
                return newArray;
            }

        });

    })
;