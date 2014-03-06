define([
	"dojo/_base/lang",
	"../model/SelectModel",
	"dojo/_base/declare"
], function (lang, SelectModel, declare) {
	// module:
	//		gform/model/MappedSelectModel

	return declare("gform.model.MappedSelectModel",[SelectModel], {
		mappedValues: null,
		mappedAttribute: null,
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
