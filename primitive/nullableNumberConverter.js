define([], function () {

	return {
		format: function (value) {
			if (typeof value === "undefined") {
				return value;
			} else if (value == null) {
				return NaN;
			} else {
				return value;
			}
		},
		parse: function (value) {
			if (typeof value === "undefined") {
				return value;
			} else if (isNaN(value)) {
				return null;
			} else {
				return value;
			}
		}
	};
});
