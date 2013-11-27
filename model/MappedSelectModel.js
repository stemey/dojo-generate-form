define([
	"dojo/_base/lang",
	"../model/PrimitiveModel",
	"dojo/_base/declare"
], function (lang, PrimitiveModel, declare) {
	// module:
	//		gform/model/MappedSelectModel

	return declare([PrimitiveModel], {
		mappedValues: null,
		mappedAttribute: null,
		options: [],
		_parentSetter: function (parent) {
			this._changeAttrValue("parent", parent);
			this.watchParent(this.mappedAttribute, lang.hitch(this, "_onMappedAttributeChanged"));
		},
		_initOptions: function () {
			var mappedValue = this.parent.getModelByPath(this.mappedAttribute).getPlainValue();
			if (mappedValue in this.mappedValues) {
				this.set("options", this.mappedValues[mappedValue]);
			} else if (this.required) {
				return this.set("options", [
					{label: "", value: null}
				]);
			} else {
				return this.set("options", []);

			}
		},
		isValid: function (value) {
			if (this.parent == null) {
				return true;
			}
			return this.options.some(function (e) {
				return e.value === value;
			});

		},
		getDefault: function () {
			if (this.options.length > 0) {
				return this.options[0].value;
			} else {
				return null;
			}
		},
		_valueSetter: function (value) {
			if (this.isValid(value)) {
				this._changeAttrValue("value", value);
			} else if (this.required) {
				this._changeAttrValue("value", this.getDefault());
			} else {
				this._changeAttrValue("value", null);
			}
		},
		_onMappedAttributeChanged: function () {
			this._initOptions();
			if (!this.isValid(this.value)) {
				if (this.required) {
					this._changeAttrValue("value", this.getDefault());
				} else {
					this._changeAttrValue("value", null);
				}
			}
		}
	});
});
