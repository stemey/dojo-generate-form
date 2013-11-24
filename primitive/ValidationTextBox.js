define([
	"dojo/_base/declare",
	"dijit/form/ValidationTextBox",
	"dojo/text!./ValidationTextBox.html",
	"./_NotValidatingOnFocusMixin"
], function (declare, ValidationTextBox, template, _NotValidatingOnFocusMixin) {

	// module:
	//		dijit/form/ValidationTextBox


	return declare("gform.ValidationTextBox", [ValidationTextBox, _NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.

		templateString: template,


		displayMessage: function (/*String*/ message) {
		}
	});
});
