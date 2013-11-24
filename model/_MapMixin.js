define([
	"../validate/UniqueProperties",
	"dojo/_base/declare"
], function (UniqueProperties, declare) {
	// module: 
	//		gform/model/SingleObject

	return declare([], {
		keyProperty: "key",
		keyValidator: null,
		constructor: function () {
			this.keyValidator = this._createKeyValidator();
		},
		_validate: function () {
			if (this.keyValidator) {
				return this.keyValidator(this);
			} else {
				return [];
			}
		},
		_keyPropertySetter: function (keyProperty) {
			this._changeAttrValue("keyProperty", keyProperty);
			this.keyValidator = this._createKeyValidator();
		},
		_createKeyValidator: function () {
			return UniqueProperties([this.keyProperty]);
		}
	});
});
