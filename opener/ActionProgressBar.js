define([
	"dojo/_base/lang",
	"dojo/_base/declare",
], function(lang, declare){
// module:
//		gform/opener/ActionProgressBar

	
return declare([], {
		// summary:
		//		This dijit provides a dialog and an embedded CrudController. This dijit is designed o be used as opener in a gform/Context. 

		constructor: function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		progressBar: null,
		progressMessage: null,
		show: function(message) {
			this.progressMessage.innerHTML=message;
			this.progressBar.show();
		},
		hide: function() {
			this.progressBar.hide();
		}

	});


});
