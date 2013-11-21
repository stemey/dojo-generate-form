define([ "dojo/_base/array",
	"dojo/_base/declare",
	"./MetaModel"
], function (array, declare, MetaModel) {
	// module:
	//		gform/model/MultiObject

	return declare([MetaModel], {
		// summary:
		//		Provides access to sibling attributes of modelHandle.

		typeProperty: null,
		groups: [],
		required: false,
		currentTypeCode: null,
		getGroup: function (typeCode) {
			var groups = array.filter(this.groups, function (group) {
				return group.getTypeCode() === typeCode;
			}, this);
			return groups.length === 0 ? null : groups[0];
		},
		update: function (/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			if (plainValue == null) {
				if (this.required) {
					this.set("currentTypeCode", this.groups[0].getValue(this.typeProperty));
					//this.value= getGroup(this.currentTypeCode);
				} else {
					this.set("currentTypeCode", null);
					//this.value=null;
				}
			} else {
				this.set("currentTypeCode", plainValue[this.typeProperty]);
				//this.value= this.getGroup(this.currentTypCode);
			}
			array.forEach(this.groups, function (group) {
				if (group.getTypeCode() === this.currentTypeCode) {
					group.update(plainValue);
				}
			}, this);
			this.set("oldValue", this.getPlainValue());
		},
		_groupsSetter: function (groups) {
			groups.forEach(function (group) {
				group.parent = this;
			}, this);
			this._changeAttrValue("groups", groups);

		},
		_currentTypeCodeSetter: function (typeCode) {
			if (this.currentTypeCode === typeCode) {
				return;
			}
			var prevGroup = this.getGroup(this.currentTypeCode);
			this._changeAttrValue("currentTypeCode", typeCode);
			var value = this.getPlainValue() || {};
			var nextGroup = this.getGroup(this.currentTypeCode);
			if (prevGroup && nextGroup) {
				prevGroup.iterateChildren(
					function (model) {
						var attributeCode = model.code;
						var nextAttribute = nextGroup.getAttribute(attributeCode);
						if (nextAttribute) {
							value[attributeCode] = prevGroup.getValue(attributeCode);
						}
					}
				);
			}

			value[this.typeProperty] = typeCode;
			this.update(value);
			this.computeProperties();
			if (this.parent) {
				this.parent.onChange(this);
			}
		},
		visit: function (cb, parentIdx) {
			if (this.currentTypeCode != null) {
				this.getGroup(this.currentTypeCode).visit(cb, parentIdx);
			} else {
				cb(this, this.emptyCascade, parentIdx);
			}
		},
		iterateChildren: function (cb) {
			if (this.currentTypeCode != null) {
				this.getGroup(this.currentTypeCode).iterateChildren(cb);
			}
		},
		getModelByPath: function (path) {
			if (this.currentTypeCode == null) {
				return null;
			} else {
				var group = this.getGroup(this.currentTypeCode);
				var model = group.getModelByPath(path);
				return model;
			}
		},
		getPlainValue: function () {
			if (!this.currentTypeCode) {
				return null;
			} else {
				var group = this.getGroup(this.currentTypeCode);
				var value = group.getPlainValue();
				value[this.typeProperty] = this.currentTypeCode;
				return value;
			}
		}
	});
});
