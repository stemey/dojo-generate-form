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
		_onBlur: function() {
			this.inherited(arguments);
			if (!this.displayedValue) {
				//value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item
				// only way to set the value to null
				this.set("value",null, null,"",{});
			}
		}
    });

});
