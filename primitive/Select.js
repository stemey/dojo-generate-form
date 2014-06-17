define([
    "dojo/_base/declare",
    "dijit/form/Select"
], function (declare, Select) {

    // module:
    //		dijit/form/DateTextBox

    return declare("gform.Select", [Select], {
        // summary:
        //		Base class for date textbox widgets with the ability to validate content of various types and provide user feedback.

        displayMessage: function (/*String*/ message) {
        },
        _updateSelection: function () {
            if (this.value === this._getValueFromOpts()) {
                this.inherited(arguments);
            }
        }
    });

});
