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
		_setDisplayedValueAttr: function (/*String*/ label, /*Boolean?*/ priorityChange) {
			if (this.store && this._created && label==="") {
				this.set("value",null, null, "", {});
				return;
			} else{
				this.inherited(arguments);
			}
		},
		labelFunc: function(item, store){
			// override to make sure there is no error when items has no serachAttr value
			return (item[this.labelAttr || this.searchAttr] || "").toString(); // String
		}
	});
});
