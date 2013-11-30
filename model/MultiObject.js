define([ "dojo/_base/array",
	"dojo/_base/declare",
	"./MetaModel"
], function (array, declare, MetaModel) {
	// module:
	//		gform/model/MultiObject

	var Model = declare([MetaModel], {
		// summary:
		//		Provides access to sibling attributes of modelHandle.

		typeProperty: null,
		groups: [],
		required: false,
		currentTypeCode: null,
		typeCodeToGroup: {},
		getGroup: function (typeCode) {
			return this.typeCodeToGroup[typeCode];
		},
		getTypeCode: function (group) {
			for (var key in this.typeCodeToGroup) {
				if (this.typeCodeToGroup[key] === group) {
					return key;
				}
			}
			return null;
		},
		isEmpty: function () {
			return this.currentTypeCode === null;
		},
		update: function (/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute


			// set to undefined so that hasCHanged returns false
			this.oldValue = undefined;
			if (plainValue == null) {
				if (this.required) {
					this.set("currentTypeCode", this.getTypeCode(groups[0]));
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
				if (this.getTypeCode(group) === this.currentTypeCode) {
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
						var nextAttribute = nextGroup.getModelByPath(attributeCode);
						if (nextAttribute) {
							value[attributeCode] = nextAttribute.getPlainValue();
						}
					}
				);
			}

			value[this.typeProperty] = typeCode;
			this.update(value);
			this.computeProperties();
			if (this.parent) {
				this.parent.onChange();
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

	Model.create = function (kwArgs) {
		var meta = kwArgs.meta;
		var groups = kwArgs.groups;
		var typeCodeToGroup = {};
		meta.groups.forEach(function (e, idx) {
			typeCodeToGroup[e.code] = groups[idx];
		});
		return new Model({typeCodeToGroup: typeCodeToGroup, groups: groups, typeProperty: meta.typeProperty, required: meta.required === true})
	};

	return Model;
});
