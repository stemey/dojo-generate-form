define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n", // i18n.getLocalization
	"dijit/form/Select"
], function(declare, kernel, i18n, Select){

	// module:
	//		dijit/form/DateTextBox

	return declare("gform.Select", [Select], {
		// summary:
		//		Base class for date textbox widgets with the ability to validate content of various types and provide user feedback.
		
		displayMessage: function(/*String*/ message){
		}
	});
	
});
