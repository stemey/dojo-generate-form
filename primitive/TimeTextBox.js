define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n", // i18n.getLocalization
	"dijit/form/TimeTextBox",//
	"dojo/text!./TimeTextBox.html"//
], function(declare, kernel, i18n, TimeTextBox, template){

	// module:
	//		dijit/form/TimeTextBox

	return declare("gform.TimeTextBox", TimeTextBox, {
		// summary:
		//		Base class for time textbox widgets with the ability to validate content of various types and provide user feedback.
		
		templateString : template,
		
		displayMessage: function(/*String*/ message){
		}
	});
	
});
