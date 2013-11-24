define([
	"dojo/_base/declare" // declare
], function (declare) {
	// module:
	//		gform/primitive/_NotValidatingOnFocusMixin
	// summary:
	//		Prevents validation on focus. If an invalid value is programmatically set, then the user's touch should not change its state. State should only change if the user has actually modified it or decided not to modify it (on blur). 

	return declare([], {
		focussing: false,
		validate: function (isFocused) {
			if (!this.focussing && isFocused) {
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
