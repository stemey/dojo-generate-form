define([
	'./equals',
	"../validate/UniqueProperties",
	"dojo/_base/declare"
], function (equals, UniqueProperties, declare) {
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
		},
		isEmptyMap: function (value) {
			return !value || Object.keys(value).length == 0;
		},
		isEmpty: function () {
			// value is array
			return this.isEmptyArray(this.value);
		},
		calculateChanged: function () {
			var value = this.getPlainValue();
			if (this.isEmptyMap(value) && this.isEmptyMap(this.oldValue)) {
				return false;
			} else if (this.isEmptyMap(value) || this.isEmptyMap(this.oldValue)) {
				return true;
			} else if (Object.keys(this.oldValue).length !== Object.keys(value).length) {
				return true;
			} else {
				return Object.keys(this.oldValue).some(function (key) {
					return !equals(this.oldValue[key], value[key]);
				}, this);
			}
		}
	});
});
