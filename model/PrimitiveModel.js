define([
    "dojo/_base/declare",
    "./Model"
], function (declare, Model) {
    // module:
    //		gform/model/PrimitiveModel

    var PrimitiveModel = declare("gform.model.PrimitiveModel", [Model], {
        // summary:
        //		Provides access to sibling attributes of modelHandle.
        value: null,
        oldValue: null,
        required: false,
        update: function (/*Object*/plainValue, setOldValue, bubble) {
            // summary:
            //		update the attribute with the given plainValue. Attribute has a single valid type.
            // plainValue:
            //		the new value of the attribute
            if (typeof plainValue === "undefined") {
                plainValue = null;
            }
            if (plainValue !== null && !this.isInstance(plainValue)) {
                throw new Error("convert value " + plainValue + " to correct type");
            }
            this._execute(function () {
                // set to undefined so that hasCHanged returns false
                //this.oldValue = undefined;
                this.set("value", plainValue);
                if (setOldValue !== false) {
                    this.set("oldValue", this.getPlainValue());
                }
                this.validate();
                this.computeProperties();
            }, bubble);

            if (this.parent && bubble !== false) {
                this.parent.onChange();
            }

        },
        isEmpty: function () {
            return this.value === null;
        },
        isInstance: function (value) {
            return true;
        },
        visit: function (cb, idx) {
            cb(this, function () {
            }, idx);
        },
        getPlainValue: function () {
            return this.value;
        },
        initDefault: function (setOldValue) {
            this._execute(function () {
                this.resetMeta();
                this.update(this.getDefaultValue(), setOldValue);
            });
        },
        getDefaultValue: function () {
            return this.schema.defaultValue || null;
        }


    });
    return PrimitiveModel;
});
