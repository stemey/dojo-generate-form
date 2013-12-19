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
					// TODO this updates the value of group. Will be done again at the end of this method.
					this.set("currentTypeCode", this.getTypeCode(this.groups[0]));
					plainValue = {};
					plainValue[this.typeProperty] = this.currentTypeCode;
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
			var nextGroup = this.getGroup(this.currentTypeCode);
			var value;
			if (typeof prevGroup === "undefined") {
				value = {};
			} else {
				value = prevGroup.getPlainValue();
			}
			if (prevGroup && nextGroup) {
				prevGroup.visit(
					function (model, cascade, idx) {
						if (typeof idx !== "undefined") {
							var nextAttribute = nextGroup.getModelByPath(idx);
							if (nextAttribute) {
								value[idx] = model.getPlainValue();
							}
						} else {
							cascade();
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
		return new Model({
			typeCodeToGroup: typeCodeToGroup,
			groups: groups,
			typeProperty: meta.typeProperty,
			required: meta.required === true
		});
	};

	return Model;
});
