define([
], function () {
// module:
//		gform/converter/refConverter

	var refConverter = {
		// summary:
		//		converts a ref {$ref: "66"} into an id {$ref: "66"}
		format: function (value) {
			if (value == null) {
				return "";
			} else {
				return value.$ref;
			}
		},
		parse: function (value) {
			if (value === "" || value == null) {
				return null;
			} else {
				return {$ref: value};
			}
		}
	};
	return refConverter;
});
