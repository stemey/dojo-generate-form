define([
	"./PrimitiveModel",
	"dojo/_base/declare"

], function (PrimitiveModel, declare) {

	return declare([PrimitiveModel], {
		code: "string",
		isEmpty: function () {
//			return this.value === null || this.value.length === 0 || this.value.match(/ +/) !== null;
			return (!this.value || /^\s*$/.test(this.value));
		},
		isInstance: function (value) {
			return typeof value === "string";
		},
		updateXX: function (value) {
			if (value == null) {
				value = "";
			}
			this._changeAttrValue("value", value);
		}
	});

});
