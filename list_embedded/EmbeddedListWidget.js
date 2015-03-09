define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
	"dijit/_Container", "dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./embedded_list_attribute.html", //
	"dojo/i18n!../nls/messages", "../layout/_LayoutMixin"
], function (lang, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template, messages, _LayoutMixin) {

	return declare("gform.EmbeddedListWidget", [ _WidgetBase, _Container,
		_TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin ], {
		templateString: template,
		messages: messages,
		group: null,
		typeProperty: null,
		_addElement: function () {
			this.target.addNew();
		},
		postCreate: function () {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});
