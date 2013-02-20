define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n" // i18n.getLocalization
], function(declare, kernel, i18n, DateTextBox, template){

	// module:
	//		dijit/form/DateTextBox

	return declare("gform._NotValidatingOnFocusMixin", [], {
		
		focussing:false,
		validate: function(isFocused)  {
			if (!this.focussing) {
				this.inherited(arguments);
			}
		},
		_onFocus: function(/*String*/ by){
			this.focussing=true	
			this.inherited(arguments);
			this.focussing=false;
		}
	});
	
});
