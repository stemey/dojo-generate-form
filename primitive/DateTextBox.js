define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n", // i18n.getLocalization
	"dijit/form/DateTextBox",//
	"dojo/text!./DateTextBox.html"//
], function(declare, kernel, i18n, DateTextBox, template){

	// module:
	//		dijit/form/DateTextBox

	return declare("gform.DateTextBox", DateTextBox, {
		// summary:
		//		Base class for date textbox widgets with the ability to validate content of various types and provide user feedback.
		
		templateString : template,
		
		displayMessage: function(/*String*/ message){
		}
	});
	
});
