define([
    "dojo/_base/declare",
    "./Model"
], function (declare, Model) {
    // module:
    //		gform/model/MultiObject

    var MergedMultiObject = declare("gform.model.MergedMultiObject",[Model], {
        // summary:
        //		Provides access to sibling attributes of modelHandle.

        typeProperty: null,
        attributes: null,
        typeToAttributes: {},
        required: false,
        currentTypeCode: null,
        update: function (/*Object*/plainValue, setOldValue) {
            // summary:
            //		update the attribute with the given plainValue. Attribute has a single valid type.
            // plainValue:
            //		the new value of the attribute

            // set to undefined so that hasCHanged returns false
            this.oldValue = undefined;
            if (plainValue === null) {
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
            this.iterateChildren(function (model) {
                model.update(plainValue[model.code], setOldValue);
            });
            if (this.setOldValue !== false) {
                this.set("oldValue", this.getPlainValue());
            }
        },
        initDefault: function(setOldValue) {
             Object.keys(this.attributes).forEach(function (key) {
                this.attributes[key].initDefault();
            }, this);
            if (setOldValue !== false) {
                this.set("oldValue", this.getPlainValue());
            }
            this.computeProperties();

        },
        getChildIndex: function (child) {
            var props = Object.keys(this.attributes).filter(function (key) {
                return this.attributes[key] === child;
            }, this);
            return props.length === 0 ? "" : props[0];
        },
        isVisible: function (attribute, typeCode) {
            if (typeCode === null) {
                return false;
            } else {
                return typeof  this.typeToAttributes[typeCode][attribute.code] !== "undefined";
            }
        },
        _currentTypeCodeSetter: function (typeCode) {
            if (this.currentTypeCode === typeCode) {
                return;
            }
            this._changeAttrValue("currentTypeCode", typeCode);
            for (var key in this.attributes) {
                var attribute = this.attributes[key];
                attribute.set("visible", this.isVisible(attribute, typeCode));
            }
        },
        iterateChildren: function (cb) {
            if (this.currentTypeCode == null) {
                return null;
            } else {
                for (var key in this.typeToAttributes[this.currentTypeCode]) {
                    cb.call(this, this.typeToAttributes[this.currentTypeCode][key]);
                }
            }
        },
        getModelByKey: function (code) {
            return this.attributes[code];
        },
        visit: function (cb, parentIdx) {
            if (this.currentTypeCode != null) {
                var attributeMap = this.typeToAttributes[this.currentTypeCode];
                var cascade = function () {
                    for (var key in attributeMap) {
                        attributeMap[key].visit(cb, key);
                    }
                };
                cb(this, cascade, parentIdx);
            } else {
                cb(this, this.emptyCascade, parentIdx);
            }

        },
        _getModelByPath: function (idx, path) {
            if (this.currentTypeCode == null) {
                return null;
            } else {
                return this.typeToAttributes[this.currentTypeCode][idx].getModelByPath(path);
            }
        },
        getPlainValue: function () {
            if (!this.currentTypeCode) {
                return null;
            } else {
                var plainValue = {};
                this.iterateChildren(function (attribute) {
                    plainValue[attribute.code] = attribute.getPlainValue();
                });
                plainValue[this.typeProperty] = this.currentTypeCode;
                return plainValue;
            }
        }
    });




    MergedMultiObject.create = function (schema, factory) {
        var typeToAttributes = {};
        var attributes={};
        schema.groups.forEach(function (group) {
            var modelAttributes = {};
            group.attributes.forEach(function (attribute) {
                var model=attributes[attribute.code];
                if (!model) {
                    model = factory(attribute);
                    model.code = attribute.code;
                    attributes[model.code]=model;
                }
                modelAttributes[model.code] = model;
            });
            typeToAttributes[group.code] = modelAttributes;
        });


        var mo = new MergedMultiObject({currentTypeCode: null, attributes: attributes, typeToAttributes: typeToAttributes, typeProperty: schema.typeProperty, required: false});
        for (var key in attributes) {
            attributes[key].parent = mo;
        }
        return mo;
    };

    return MergedMultiObject;
});
