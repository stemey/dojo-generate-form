define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/request",
	"dojo/promise/all",	
	"dojo/when",
	"./_ActionMixin",
	"dojo/i18n!../../nls/messages",	
	
], function(declare, lang, array, domClass, request, all, when, _ActionMixin, messages	){
// module:
//		gform/controller/actions/Discard

	
return declare( [_ActionMixin], {
	// summary:
	//		the editor's changes are removed.
	messageModule: "actions.discard",
	execute: function() {
			this.ctrl.editor.reset();	
		},
	});
});
