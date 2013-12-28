define([
], function () {

	return {
		format: function (value) {
			return value == null ? "" : value;
		},
		parse: function (value) {
			if (value === "") {
				return null;
			} else {
				return value;
			}
		}
	};
});
