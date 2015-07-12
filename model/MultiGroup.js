define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "./Model",
    "./AdditionalPropertiesMixin"
], function (lang, declare, Model, AdditionalPropertiesMixin) {
    // module:
    //		gform/model/SingleObject

    return declare("gform.model.MultiGroup", [Model, AdditionalPropertiesMixin], {
        // summary:
        //		Provides access to sibling attributes of modelHandle.
        groups: null,
        isNull: true,
        required: false,
        // group usually does not represent a model and thus is not visited. set this to true to change that beahvior
        visitThis: true,
        getTypeCode: function () {
            return null;
        },
        _isNullSetter: function (value) {
            if (value !== this.isNull) {
                if (value === true) {
                    this.update(null);
                } else {
                    this.update({});
                }
            }
        },
        _groupsSetter: function (groups) {
            groups.forEach(function (group) {
                group.parent = this;
            }, this);
            this._changeAttrValue("groups", groups);
        },
        calculateChanged: function () {
            return false;
        },
        initDefault: function (setOldValue) {
            this.isNull = false;
            this.groups.forEach(function (group) {
                group.initDefault(setOldValue);
            }, this);
        },
        update: function (/*Object*/plainValue, setOldValue, bubble) {
            // summary:
            //		update the attribute with the given plainValue. Attribute has a single valid type.
            // plainValue:
            //		the new value of the attribute
            plainValue = this.transformIn(plainValue);
            this._execute(function () {

                if (this.required && !plainValue) {
                    plainValue = {};
                }
                if (plainValue === null) {
                    this.isNull = true;
                } else {
                    this.isNull = false;
                    this.groups.forEach(function (group) {
                        group.update(plainValue, setOldValue, bubble);
                    });
                }
                if (setOldValue !== false) {
                    this.set("oldValue", this.getPlainValue());
                }
                this.onChange(bubble, this);
            }, false);

        },
        isEmpty: function () {
            return this.isNull;
        },
        getChildPath: function (child) {
            if (this.parent) {
                return parent.getChildPath(this);
            } else {
                return null;
            }
        },
        visit: function (cb, parentIdx) {
            if (this.visitThis) {
                var me = this;
                cb(this, function () {
                    for (var index = 0; index < me.groups.length; index++) {
                        me.getModelByIndex(index).visit(cb, parentIdx);
                    }
                }, parentIdx);
            } else {
                for (var index = 0; index < this.groups.length; index++) {
                    this.getModelByIndex(index).visit(cb, parentIdx);
                }
            }
        },
        iterateChildren: function (cb) {
            for (var index = 0; index < this.groups.length; index++) {
                cb.call(this, this.getModelByIndex(index));
            }
        },
        getModelByIndex: function (index) {
            return this.groups[index];
        },
        _getModelByPath: function (index, path) {
            var model = this.getModel(index);
            if (!model) {
                return null;
            } else {
                return model.getModelByPath(path);
            }
        },
        getModel: function (attributeCode) {
            var model = null;
            this.groups.map(function (group) {
                var m = group.getModel(attributeCode);
                if (!!m) {
                    model = m;
                }
            });
            return model;
        },
        getPlainValue: function () {
            if (this.isNull) {
                return null;
            } else {
                var plainValue = {};
                this.groups.forEach(function (group) {
                    var value = group.getPlainValue();
                    lang.mixin(plainValue, value);
                });
                plainValue = this.transformOut(plainValue);
                return plainValue;
            }
        },
        init: function () {
            this.inherited(arguments);
            this.groups.forEach(function (group) {
                group.init();
            });
        }
    });
});
