define([
    "dojo/_base/declare",
    "./Model",
    "../schema/meta",
    "dojo/_base/lang"
], function (declare, Model, metaHelper, lang) {
    // module:
    //		gform/model/SingleObject

    return declare("gform.model.SingleObject", [Model], {
        // summary:
        //		Provides access to sibling attributes of modelHandle.
        attributes: null,
        isNull: true,
        subgroup: false,
        _attributesSetter: function (attributes) {
            this._changeAttrValue("attributes", attributes);
            for (var key in attributes) {
                attributes[key].set("parent", this);
                attributes[key].code = key;
            }
        },
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
                for (var key in this.attributes) {
                    this.attributes[key].update(plainValue[key], setOldValue, this.bubble);
                }
            }
            if (this.isNull !== oldIsNull) {
                this._changeAttrValue("isNull", this.isNull);
            }
            this.onChange(true);
        },
        _isNullSetter: function (value) {
            if (value !== this.isNull) {
                if (value === true) {
                    this.updateGroup(null);
                } else {
                    this.updateGroup({});
                }
            }
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
                plainValue = this.transformOut(plainValue);
                return plainValue;
            }
        },
        getChildIndex: function (child) {
            var props = Object.keys(this.attributes).filter(function (key) {
                return this.attributes[key] === child;
            }, this);
            return props.length === 0 ? "" : props[0];
        },
        iterateChildren: function (cb) {
            if (!this.isNull) {
                this._getAttributeCodes.forEach( function(key) {
                    cb.call(this, this.getAttribute(key));
                }, this);
            }
        },
        _getAdditionalAttributeCode: function() {
            return this.meta && this.meta.additionalProperties ? this.meta.additionalProperties.code || "additionalProperties" : null;
        },
        _getAttributeCodes: function() {
            return Object.keys(this.attributes);
        },
        visit: function (cb, parentIdx) {
            if (this.subgroup && typeof parentIdx === "undefined") {
                if (!this.isNull) {
                    this._getAttributeCodes().forEach(function(key) {
                        this.attributes[key].visit(cb, key);
                    },this);
                }
            } else {
                var me = this;
                cb(this, function () {
                    if (!me.isNull) {
                        me._getAttributeCodes().forEach(function(key) {
                            me.attributes[key].visit(cb, key);
                        });

                    }
                }, parentIdx);
            }
        },
        transformIn: function(value) {
            var additionalAttribute = this._getAdditionalAttributeCode();
            if (value && additionalAttribute) {
                var newValue={};
                lang.mixin(newValue,value);
                var additionalProperties ={};
                var attributeCodes= this._getAttributeCodes();
                Object.keys(newValue).forEach( function(key) {
                    if (attributeCodes.indexOf(key)<0) {
                        additionalProperties[key]=newValue[key];
                        delete newValue[key];
                    }
                }, this);
                newValue[additionalAttribute]=additionalProperties;
                return newValue;
            } else {
                return value;
            }
        },
        transformOut: function(value) {
            var additionalAttribute = this._getAdditionalAttributeCode();
            if (additionalAttribute) {
                var newValue={};
                lang.mixin(newValue,value);
                lang.mixin(newValue, value[additionalAttribute]);
                delete newValue[additionalAttribute];
                return newValue;
            } else {
                return value;
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
