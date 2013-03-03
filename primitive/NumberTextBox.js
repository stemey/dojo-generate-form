define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n", // i18n.getLocalization
	"dijit/form/NumberTextBox",
	"dojo/text!./ValidationTextBox.html",
	"./_NotValidatingOnFocusMixin"//
], function(declare, kernel, i18n, NumberTextBox,template, _NotValidatingOnFocusMixin){



	return declare("gform.NumberTextBox", [NumberTextBox,_NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.

		templateString:template,
		displayMessage: function(/*String*/ message){
		}
	});
});
