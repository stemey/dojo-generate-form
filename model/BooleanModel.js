define([
	"./PrimitiveModel",
	"dojo/_base/declare"

], function (PrimitiveModel, declare) {

	return declare("gform.model.BooleanModel",[PrimitiveModel], {
		_valueSetter: function (value) {
			if (value == null) {
				value = false;
			}
			this._changeAttrValue("value", value);
		}
	});

});
