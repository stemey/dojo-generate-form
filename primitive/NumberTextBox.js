define([
	"dojo/_base/declare",
	"dijit/form/NumberTextBox",
	"./_NotValidatingOnFocusMixin"
], function (declare, NumberTextBox, _NotValidatingOnFocusMixin) {


	return declare("gform.NumberTextBox", [NumberTextBox, _NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.

		_isValidSubset: function () {
			// otherwise initially entered illegal characters are not marked as error.
			return false;
		},
		displayMessage: function () {
		}

	});
});
