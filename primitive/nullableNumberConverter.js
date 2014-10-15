define([], function () {

	return {
		format: function (value) {
            if (this.target.get("focused")) {
                throw new "don't update when focus is set";
            }
            if (typeof value === "string") {
                // sometimes number gets turned into string (e.g. LocalStorage)
                return parseFloat(value);
            } else
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
