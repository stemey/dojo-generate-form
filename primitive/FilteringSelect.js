define([
	"dojo/_base/declare", // declare
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/i18n", // i18n.getLocalization
	"dijit/form/FilteringSelect",//
	"./_NotValidatingOnFocusMixin"//
], function(declare, kernel, i18n, FilteringSelect, _NotValidatingOnFocusMixin){

	// module:
	//		dijit/form/DateTextBox

	return declare("gform.FilteringSelect", [FilteringSelect, _NotValidatingOnFocusMixin], {
		// summary:
		//		Base class for date textbox widgets with the ability to validate content of various types and provide user feedback.
	//	templateString: template,
		displayMessage: function(/*String*/ message){
		}
	});
	
});
