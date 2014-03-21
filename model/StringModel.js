define([
    "./PrimitiveModel",
    "dojo/_base/declare"

], function (PrimitiveModel, declare) {

	return declare([PrimitiveModel], {
		code: "string",
		isEmpty: function () {
			return (!this.value || /^\s*$/.test(this.value));
		},
		isInstance: function (value) {
			return typeof value === "string";
		}
	});

});
