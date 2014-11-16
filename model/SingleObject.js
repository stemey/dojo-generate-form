define([
    "dojo/_base/declare",
    "./Model",
    "../schema/meta",
    "./AdditionalPropertiesMixin"
], function (declare, Model, metaHelper, AdditionalPropertiesMixin) {
    // module:
    //		gform/model/SingleObject

    return declare("gform.model.SingleObject", [Model, AdditionalPropertiesMixin], {
        // summary:
        //		Provides access to sibling attributes of modelHandle.
        attributes: null,
        isNull: true,
        editorFactory: null,
        isEmpty: function () {
            return this.isNull;
        },
        watchPath: function (path, watcher) {
            // TODO only works for path being a simple attribute
            return this.getModel(path).watch(watcher);
        },
        update: function (/*Object*/plainValue, setOldValue, bubble) {
            // summary:
            //		update the attribute with the given plainValue. Attribute has a single valid type.
            // plainValue:
            //		the new value of the attribute
            if (this.required && (plainValue === null || typeof plainValue === "undefined")) {
                plainValue = {};
            }
            plainValue = this.transformIn(plainValue);
            this._execute(function () {
                // set to undefined so that hasChanged returns false
                this.updateGroup(plainValue, setOldValue);

                this.computeProperties();
                if (setOldValue !== false) {
                    this.set("oldValue", this.getPlainValue());
                }
            }, false);
            if (this.parent && bubble !== false) {
                this.parent.onChange();
            }

        },
        _attributesGetter: function () {
            this._createAttributes();
            return this.attributes;
        },
        getValue: function (attributeCode) {
            if (this.isNull) {
                return null;
            } else {
                return this.get("attributes")[attributeCode].getPlainValue();
            }
        },
        setValue: function (attributeCode, value) {
            if (!this.isNull) {
                this.getModel(attributeCode).update(value);
            }
        },
        getModel: function (attributeCode) {
            return this.get("attributes")[attributeCode];
        },
        updateGroup: function (/*Object*/plainValue, setOldValue) {
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

            var oldIsNull = this.isNull;
            if (plainValue === null || typeof plainValue === "undefined") {
                this.isNull = true;
            } else {
                this.isNull = false;
                this._getAttributeCodes().forEach(function (key) {
                    this.get("attributes")[key].update(plainValue[key], setOldValue, this.bubble);
                }, this);
            }
            if (this.isNull !== oldIsNull) {
                this._changeAttrValue("isNull", this.isNull);
            }
            this.onChange(true);
        },
        _createAttributes: function () {
            if (this.attributes === null) {
                this.attributes = {};
                if (this.schema.attributes) {
                    this.schema.attributes.forEach(function (attribute) {
                        var model = this.editorFactory.createAttributeModel(attribute);
                        this.attributes[attribute.code] = model;
                        model.set("parent", this);
                    }, this);
                } else {
                    this.attributes = {};
                }
            }
        },
        _isNullSetter: function (value) {
            if (value !== this.isNull) {
                if (value === true) {
                    this.updateGroup(null);
                } else {
                    this.initDefault(false);
                }
            }
        },
        getAttribute: function (code) {
            return this.get("attributes")[code];
        },
        getModelByKey: function (code) {
            return this.get("attributes")[code];
        },
        getPlainValue: function () {
            if (this.isNull) {
                return null;
            } else {
                var plainValue = {};
                for (var key in this.get("attributes")) {
                    plainValue[key] = this.get("attributes")[key].getPlainValue();
                }
                plainValue = this.transformOut(plainValue);
                return plainValue;
            }
        },
        getChildIndex: function (child) {
            var props = Object.keys(this.get("attributes")).filter(function (key) {
                return this.get("attributes")[key] === child;
            }, this);
            return props.length === 0 ? "" : props[0];
        },
        iterateChildren: function (cb) {
            if (!this.isNull) {
                this._getAttributeCodes.forEach(function (key) {
                    cb.call(this, this.getAttribute(key));
                }, this);
            }
        },
        visit: function (cb, parentIdx) {

            var me = this;
            cb(this, function () {
                if (!me.isNull) {
                    me._getAttributeCodes().forEach(function (key) {
                        me.attributes[key].visit(cb, key);
                    });

                }
            }, parentIdx);

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
        },
        initDefault: function (setOldValue) {
			var oldValue = this.get("oldValue");
            this.isNull = false;
            this._createAttributes();
            Object.keys(this.get("attributes")).forEach(function (key) {
                var model = this.get("attributes")[key];
                // don't init Default on complex attributes unless it is an array with defaults or it is required.
                if (metaHelper.isArray(model.schema) || !metaHelper.isComplex(model.schema) || model.isRequired()) {
                    model.initDefault();
                }

            }, this);
            this.resetMeta();
			if (setOldValue === false) {
				// restMeta sets oldValue to current value
				// TODO should reset Meta really reset oldValue?
				this.set("oldValue", oldValue);
			}

            this.computeProperties();
        },
        init: function () {
            Object.keys(this.get("attributes")).forEach(function (key) {
                var model = this.get("attributes")[key];
                model.init();
            }, this);
        }
    });
});
