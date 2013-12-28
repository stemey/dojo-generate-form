define([
	"dojo/_base/declare",
	"dijit/form/DateTextBox",
	"./_NotValidatingOnFocusMixin"
], function (declare, DateTextBox, _NotValidatingOnFocusMixin) {

	// module:
	//		dijit/form/DateTextBox

	return declare("gform.DateTextBox", [DateTextBox, _NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for date textbox widgets with the ability to validate content of various types and provide user feedback.

		displayMessage: function (/*String*/ message) {
		}
	});

});
