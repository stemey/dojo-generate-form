define(["dojo/_base/declare"
], function (declare) {
	var Visitor = declare([], {
		constructor: function () {
			this.events = [];
		},
		events: null,
		fn: function (model, cascade, idx) {
			if (typeof idx === "undefined") {
				idx = "noidx";
			}
			this.events.push(idx);
			cascade();
		}
	});
	return function () {
		console.log("new visitor");
		return new Visitor();
	};
});

