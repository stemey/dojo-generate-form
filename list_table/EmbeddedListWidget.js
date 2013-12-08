define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_Container",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./embedded_list_attribute.html",
	"dojo/i18n!../nls/messages"
], function (lang, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template, messages) {

	return declare([ _WidgetBase, _Container,
		_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString: template,
		messages: messages,
		attribute: null,
		_addElement: function () {

			var value = {};
			if (this.attribute.groups) {
				value[this.attribute.typeProperty] = this.attribute.groups[0].code;
			}
			this.target.push(value);
		},
		postCreate: function () {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});
