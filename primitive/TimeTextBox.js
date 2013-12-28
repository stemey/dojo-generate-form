define([
	"dojo/_base/declare",
	"dijit/form/TimeTextBox",
	"dojo/text!./TimeTextBox.html",
	"./_NotValidatingOnFocusMixin"
], function (declare, TimeTextBox, template, _NotValidatingOnFocusMixin) {

	// module:
	//		dijit/form/TimeTextBox

	return declare("gform.TimeTextBox", [TimeTextBox, _NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for time textbox widgets with the ability to validate content of various types and provide user feedback.

		templateString: template,

		displayMessage: function (/*String*/ message) {
		},
		focussing: false,
		validate: function (isFocused) {
			if (!this.focussing) {
				this.inherited(arguments);
			}
		},
		_onFocus: function (/*String*/ by) {
			this.focussing = true;
			this.inherited(arguments);
			this.focussing = false;
		}
	});

});
