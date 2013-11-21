define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./confirmDialog.html"
], function (declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
// module:
//		gform/controller/ConfirmDialog


	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		// summary:
		//		a dialog to confirm or cancel an action.
		templateString: template,
		// callback: function
		//		a function with a boolean parameter indicating the user's decision.
		callback: null,
		// dialogMessage: 
		//		an html element whose innerHTML displays the question to the user.
		dialogMessage: null,
		// dialogYesButton:
		//		the button to answer yes
		dialogYesButton: null,
		// dialogNoButton:
		//		the button to answer no
		dialogNoButton: null,
		// dialog: dijit/Dialog
		//		the dialog
		dialog: null,
		postCreate: function () {
			this.dialogYesButton.on("click", lang.hitch(this, "confirm"));
			this.dialogNoButton.on("click", lang.hitch(this, "cancel"));
			this.dialog.on("close", lang.hitch(this, "onClose"));
		},
		show: function (options) {
			// summary:
			//		display the dialog
			// options: object
			//		- message
			//		- callback
			this.callback = options.callback;
			this.dialogMessage.innerHTML = options.message;
			this.dialog.show();
		},
		onClose: function () {
			this.callback(false);
			this.callback = null;
		},
		confirm: function () {
			this.callback(true);
			this.dialog.hide();
			this.callback = null;
		},
		cancel: function () {
			this.callback(false);
			this.dialog.hide();
			this.callback = null;
		}
	});


});
