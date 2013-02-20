define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n", // i18n.getLocalization
	"dijit/form/ValidationTextBox",
	"dojo/text!./ValidationTextBox.html",//
	"./_NotValidatingOnFocusMixin"//
], function(declare, kernel, i18n, ValidationTextBox,  template,_NotValidatingOnFocusMixin){

	// module:
	//		dijit/form/ValidationTextBox


	var ValidationTextBox;
	return ValidationTextBox = declare("gform.ValidationTextBox", [ValidationTextBox,_NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.

		templateString: template,

		
		displayMessage: function(/*String*/ message){
		}
	});
});
