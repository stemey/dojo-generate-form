define([
	'./PrimitiveModel',
	"dojo/_base/declare"
], function (PrimitiveModel, declare) {
	// module:
	//		gform/model/ObjectModel

	var ObjectModel = declare("gform.model.ObjectModel", [PrimitiveModel], {
		code: "any",
		calculateChanged: function () {
			if (typeof this.oldValue === "undefined") {
				return false;
			} else {
				return JSON.stringify(this.value) !== JSON.stringify(this.oldValue);
			}
		}
	});
	return ObjectModel;
});
