define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./MetaModel"
], function (lang, declare, MetaModel) {
	// module:
	//		gform/model/SingleObject

	return declare([MetaModel], {
		// summary:
		//		Provides access to sibling attributes of modelHandle.
		attributes: null,
		isNull: true,
		subgroup: false,
		constructor: function () {
			this.watch("isNull", lang.hitch(this, "_onIsNullChange"));
		},
		_attributesSetter: function (attributes) {
			this._changeAttrValue("attributes", attributes);
			for (var key in attributes) {
				attributes[key].set("parent", this);
				attributes[key].code = key;
			}
		},
		_onIsNullChange: function () {
			this.onChange(true);
		},
		isEmpty: function () {
			return this.isNull;
		},
		update: function (/*Object*/plainValue, bubble) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			if (this.required && plainValue == null) {
				plainValue = {};
			}
			this._execute(function () {
				// set to undefined so that hasCHanged returns false
				this.oldValue = undefined;
				this.updateGroup(plainValue);
				this.computeProperties();
				this.set("oldValue", this.getPlainValue());
			}, false);
			if (this.parent && bubble !== false) {
				this.parent.onChange();
			}
		},
		getValue: function (attributeCode) {
			if (this.isNull) {
				return null;
			} else {
				return this.attributes[attributeCode].getPlainValue();
			}
		},
		setValue: function (attributeCode, value) {
			if (!this.isNull) {
				this.getModel(attributeCode).update(value);
			}
		},
		getModel: function (attributeCode) {
			return this.attributes[attributeCode];
		},
		updateGroup: function (/*Object*/plainValue) {
			// summary:
			//		update the group with the given plainValue
			// groupOrType:
			//		the schema of the group.
			// plainValue:
			//		the new value of the modelHandle
			// modelHandle:
			//		the modelHandle bound to the Editor.
			// editorFactory:
			//		editorFactory provides access to AttributeFactory and GroupFactory which may override the
			// 		update behavior.
			if (plainValue == null) {
				this.set("isNull", true);
			} else {
				this.set("isNull", false);
				for (var key in this.attributes) {
					this.attributes[key].update(plainValue[key], this.bubble);
				}
			}
		},
		getAttributeCodes: function () {
			var codes = [];
			for (var key in this.attributes) {
				codes.push(key);
			}
			return codes;
		},
		getAttribute: function (code) {
			return this.attributes[code];
		},
		getModelByKey: function (code) {
			return this.attributes[code];
		},
		getPlainValue: function () {
			if (this.isNull) {
				return null;
			} else {
				var plainValue = {};
				for (var key in this.attributes) {
					plainValue[key] = this.attributes[key].getPlainValue();
				}
				return plainValue;
			}
		},
		iterateChildren: function (cb) {
			if (!this.isNull) {
				for (var key in this.getAttributeCodes()) {
					cb.call(this, this.getAttribute(this.getAttributeCodes()[key]));
				}
			}
		},
		visit: function (cb, parentIdx) {
			if (this.subgroup && typeof parentIdx === "undefined") {
				for (var key in this.attributes) {
					this.attributes[key].visit(cb, key);
				}
			} else {
				var me = this;
				cb(this, function () {
					for (var key in me.attributes) {
						me.attributes[key].visit(cb, key);
					}
				}, parentIdx);
			}
		},
		_getModelByPath: function (idx, path) {
			if (this.isNull) {
				return null;
			}
			var model = this.getModel(idx);
			if (!model) {
				return null;
			}
			return model.getModelByPath(path);
		}
	});
});
