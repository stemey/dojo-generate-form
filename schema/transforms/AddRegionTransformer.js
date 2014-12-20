define(['dojo/_base/lang', 'dojo/_base/declare'],
    function (lang, declare) {
// module:
//		gform/schema/Transformer

        return declare('AddRegionTransformer', [], {
            constructor: function (kwArgs) {
                lang.mixin(this, kwArgs);
            },
            pattern: /.*/,
            execute: function (attributes) {
				attributes.forEach(function(groupSchema) {
					groupSchema.attributes.push({
						code: "region",
						type: "string",
						values: ["top", "center", "bottom"]
					})
				});
				return attributes;
            }


        });

    })
;
