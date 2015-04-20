define([
	'dojo/_base/declare'
], function (declare) {

	return declare([], {
		out: function (value) {
			Object.keys(value).forEach(function (prop) {
				var v = value[prop];
				if (v === null || typeof v === "undefined") {
					delete value[prop];
				}
			});
			return value;
		},
		"in": function (value) {
			return value;
		}
	});
});
