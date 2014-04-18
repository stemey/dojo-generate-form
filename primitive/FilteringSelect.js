define([
    "dojo/_base/declare",
    "dijit/form/FilteringSelect",
    "./_NotValidatingOnFocusMixin"
], function (declare, FilteringSelect, _NotValidatingOnFocusMixin) {

    // module:
    //		dijit/form/DateTextBox

    return declare("gform.FilteringSelect", [FilteringSelect, _NotValidatingOnFocusMixin], {
        // summary:
        //		Base class for date textbox widgets with the ability to validate content of various types and provide user feedback.
        //	templateString: template,
        displayMessage: function (/*String*/ message) {
        },
        _callbackSetLabel: function (/*Array*/ result, /*Object*/ query, /*Object*/ options, /*Boolean?*/ priorityChange) {
            // summary:
            //		Callback from dojo.store after lookup of user entered value finishes

            // setValue does a synchronous lookup,
            // so it calls _callbackSetLabel directly,
            // and so does not pass dataObject
            // still need to test against _lastQuery in case it came too late
            if ((query && query[this.searchAttr] !== this._lastQuery) || (!query && result.length && this.store.getIdentity(result[0]) != this._lastQuery)) {
                return;
            }
            if (!result.length || result.length > 1) {
                //#3268: don't modify display value on bad input
                //#3285: change CSS to indicate error
                this.set("value", '', priorityChange || (priorityChange === undefined && !this.focused), this.textbox.value, null);
            } else {
                this.set('item', result[0], priorityChange);
            }
        }
    });

});
