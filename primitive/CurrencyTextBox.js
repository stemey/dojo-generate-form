define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n", // i18n.getLocalization
	"dijit/form/CurrencyTextBox",
	"./_NotValidatingOnFocusMixin"//
], function(declare, kernel, i18n, CurrencyTextBox, _NotValidatingOnFocusMixin){



	return declare("gform.NumberTextBox", [CurrencyTextBox,_NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.

		displayMessage: function(/*String*/ message){
		},
		_setValueAttr: function(value){
			// summary:
			//		Make sure an invalid value does not fire a value change. 
			if(typeof value == "number"){
					if(!isNaN(value)) {
						this.inherited(arguments);
					}
			}
		},

	});
});
