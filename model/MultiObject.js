define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./Model",
	"./AdditionalPropertiesMixin"
], function (declare, lang, Model, AdditionalPropertiesMixin) {
	// module:
	//		gform/model/MultiObject

	var Model = declare("gform.model.MultiObject", [Model, AdditionalPropertiesMixin], {
		// summary:
		//		Provides access to sibling attributes of modelHandle.

		typeProperty: null,
		required: false,
		currentTypeCode: null,
		typeCodeToGroup: {},
		editorFactory: null,
		getGroup: function (typeCode) {
			var group = this.typeCodeToGroup[typeCode];
			if (!group) {
				group = this.addGroup(typeCode);
			}
			return group;
		},
		addGroup: function (typeCode) {
			if (typeCode === null) {
				return null;
			}
			var schema = this.schema.groups.filter(function (group) {
				return group.code === typeCode;
			}, this)[0];
			if (schema == null) {
				return null;
			}
			var group = this.editorFactory.createGroupModel(schema, {});
			this.typeCodeToGroup[typeCode] = group;
			group.set("parent", this);
			if (this.initialized) {
				group.initDefault();
				group.init();
			}
			return group;
		},
		getChildPath: function (child) {
			return this.parent ? this.parent.getChildPath(this) : "";
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
		initDefault: function (setOldValue) {
			this._execute(function () {
				var typeCode = this.schema.groups[0].code;
				this.set("currentTypeCode", typeCode);
				this.getGroup(typeCode).initDefault();
				if (setOldValue !== false) {
					this.set("oldValue", this.getPlainValue());
				}
				this.onChange();
			}, false);
		},
		update: function (/*Object*/plainValue, setOldValue, bubble) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute


			// set to undefined so that hasChanged returns false
			plainValue = this.transformIn(plainValue);
			this.oldValue = undefined;
			if (plainValue === null || typeof plainValue === "undefined") {
				if (this.required) {
					// TODO this updates the value of group. Will be done again at the end of this method.
					this.set("currentTypeCode", this.schema.groups[0].code);
					plainValue = {};
					plainValue[this.typeProperty] = this.currentTypeCode;
					//this.value= getGroup(this.currentTypeCode);
				} else {
					this.currentTypeCode = null;
					//this.value=null;
				}
			} else {
				var typeCode = plainValue[this.typeProperty] || this.currentTypeCode || this.getTypeCode(this.schema.groups[0]);
				if (this.getGroup(typeCode) != null) {
					this._changeAttrValue("currentTypeCode", typeCode);
				}
			}
			if (this.currentTypeCode !== null) {
				var currentGroup = this.getGroup(this.currentTypeCode);
				currentGroup.update(plainValue, setOldValue, bubble);
			}
			if (this.setOldValue !== false) {
				this.set("oldValue", this.getPlainValue());
			}
		},
		_currentTypeCodeSetter: function (typeCode) {
			if (this.currentTypeCode === typeCode) {
				return;
			}
			var prevGroup = this.getGroup(this.currentTypeCode);
			this._changeAttrValue("currentTypeCode", typeCode);
			var nextGroup = this.getGroup(this.currentTypeCode);
			var value;
			if (typeof prevGroup === "undefined" || prevGroup === null) {
				value = {};
			} else {
				value = prevGroup.getPlainValue() || {};
			}
			if (typeCode !== null) {
				value[this.typeProperty] = typeCode;
				//this.update(value);
			}
			if (prevGroup && nextGroup) {
				var nuValue = nextGroup.getPlainValue();
				prevGroup.visit(
					function (model, cascade, idx) {
						if (typeof idx === "undefined") {
							cascade();
						} else {
							var nextAttribute = nextGroup.getModelByPath(idx);
							if (nextAttribute) {
								nuValue[idx] = model.getPlainValue();
							}
						}
					}
				);
				// break
				nextGroup.update(nuValue, false, false);
			}
			this.onChange(false);
		},
		visit: function (cb, parentIdx) {
			if (this.currentTypeCode !== null) {
				var me = this;
				cb(this, function () {
					me.getGroup(me.currentTypeCode).visit(cb, parentIdx);
				}, parentIdx);
			} else {
				cb(this, this.emptyCascade, parentIdx);
			}
		},
		iterateChildren: function (cb) {
			if (this.currentTypeCode !== null) {
				this.getGroup(this.currentTypeCode).iterateChildren(cb);
			}
		},
		getModelByPath: function (path) {
			if (this.currentTypeCode === null) {
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
				var plainValue = {};
				lang.mixin(plainValue, value);
				plainValue[this.typeProperty] = this.currentTypeCode;
				plainValue = this.transformOut(plainValue);
				return plainValue;
			}
		},
		addError: function (path, message) {
			// summary:
			//		add an error the model at path
			// path: string
			//		identifies the model
			// message: string
			//		the message
			var model = path === "" ? this : this.getModelByPath(path);
			model._addError(message, !path || path.length === 0);
		},
		removeError: function (path, message) {
			// summary:
			//		remove an error from the model on the path
			// path: string
			//		the path to the model
			// message: string
			//		to identify the message. If a different message is present then it won't be removed.
			var model = path === "" ? this : this.getModelByPath(path);
			if (model) {
				model._removeError(message);
			}
		},
		init: function () {
			this.inherited(arguments);
			if (this.currentTypeCode) {
				var currentGroup = this.typeCodeToGroup[this.currentTypeCode];
				if (currentGroup) {
					currentGroup.init();
				}
			}

		}
	});

	Model.create = function (kwArgs) {
		var schema = kwArgs.schema;
		var typeCodeToGroup = {};
		return new Model({
			typeCodeToGroup: typeCodeToGroup,
			schema: schema,
			typeProperty: schema.typeProperty,
			required: schema.required === true,
			editorFactory: kwArgs.editorFactory
		});
	};

	return Model;
});
