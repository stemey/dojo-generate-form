define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n" // i18n.getLocalization
], function(declare, kernel, i18n, DateTextBox, template){
	// module:
	//		gform/primitive/_NotValidatingOnFocusMixin
	// summary:
	//		Prevents validation on focus. If an invalid value is programmatically set, then the user's touch should not change its state. State should only change if the user has actually modified it or decided not to modify it (on blur). 

	return declare([], {
		focussing:false,
		validate: function(isFocused)  {
			if (!this.focussing) {
				this.inherited(arguments);
			}
		},
		_onFocus: function(/*String*/ by){
			this.focussing=true;	
			this.inherited(arguments);
			this.focussing=false;
		}
	});
	
});
