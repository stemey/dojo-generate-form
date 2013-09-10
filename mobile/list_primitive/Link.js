define([ "dojo/_base/lang", "dojo/_base/array", "dojo/_base/declare",
		"dijit/_WidgetBase", "dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful",
		"dojo/text!./Link.html", "dijit/form/TextBox", "dojo/i18n!../../nls/messages","../../group/_DecoratorMixin","../../group/_GroupMixin", "dojo/i18n", "dojo/i18n!../../nls/messages"//
], function(lang, array, declare, _WidgetBase, _Container, _TemplatedMixin, 
		_WidgetsInTemplateMixin, Stateful,template, TextBox, messages, _DecoratorMixin, _GroupMixin, i18n, messages) {

	return declare( [ _WidgetBase, 
			_TemplatedMixin ], {
		templateString : template,
		transition:null,
		postCreate: function() {
			this.on("click", this.transition);
		},
		onLabelClick: function(e) {
			this.transition();
		}
	});

});
