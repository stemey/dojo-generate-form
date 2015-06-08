define([
	'../../schema/meta',
	'dojo/_base/declare'
], function (meta, declare) {

	return declare([], {
		out: function (value, schema) {
			Object.keys(value).forEach(function (prop) {

				var v = value[prop];
				if (v === null || typeof v === "undefined") {
					delete value[prop];
				}
			});
			meta.collectAttributes(schema).forEach(function(attribute){
				if (attribute.type=="boolean") {
					var defaultValue = attribute.defaultValue || false;
					if (value[attribute.code]===defaultValue) {
						delete value[attribute.code];
					}
				}
			})
			return value;
		},
		"in": function (value) {
			return value;
		}
	});
});
