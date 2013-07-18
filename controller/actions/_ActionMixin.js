define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/request",
	"dojo/promise/all",	
	"dojo/when",
	"dijit/form/Button",
	"dojo/i18n!../../nls/messages",	
], function(declare, lang, array, domClass, request, all, when, Button, messages	){


	
return declare( [], {
	ctrl:null,	
	messageModule:null,	
	buttonProps: {},
	setup: function() {
	},
	createButton: function() {
		var props = {onClick: lang.hitch(this, "execute")};
		if (this.buttonProps) {
			lang.mixin(props, this.buttonProps);
		}
		if (this.messageModule) {
			var keys= ['label', 'iconClass'];
			for (var key in keys) {
				var dijitProp = keys[key];
				var messageKey = this.messageModule+"."+keys[key];
				if (!props[dijitProp]) {
					props[dijitProp] = messages[messageKey];
				}
			}
		}
		return new Button(props);
	},
	_execute: function(promise, command) {
			when(promise,lang.hitch(this,"_on"+command),lang.hitch(this,"_on"+command+"Failed"));
		}
	});
});
