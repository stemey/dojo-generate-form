define(['dojo/_base/lang', 'dojo/_base/declare'],
    function (lang, declare) {
// module:
//		gform/schema/Transformer

        return declare('FilterAttributeTransformer', [], {
            constructor: function (kwArgs) {
                lang.mixin(this, kwArgs);
            },
            pattern: /.*/,
            execute: function (attributes) {
                var newArray = [];
                attributes.forEach(function (e) {
                    if (e.code && !e.code.match(this.pattern)) {
                        newArray.push(e);
                    }
                });
                return newArray;
            }


        });

    })
;