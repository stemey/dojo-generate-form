define([
    "dojo/_base/declare",
    "./Model"
], function (declare, Model) {
    // module:
    //		gform/model/QueryModel

    return declare("gform.model.DerivedModel", [Model], {
        update: function() {
            // noop
        },
        getPlainValue: function () {
            return undefined;
        },
        validateRecursively: function() {
            // TODO there seems to be an argument mismatch if this method is not overwritten
        },
        isDerived: function () {
            return true;
        },
        calculateChanged: function() {
            return false;
        }


    });
})
;
