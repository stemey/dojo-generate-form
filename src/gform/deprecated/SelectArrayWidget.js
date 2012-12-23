define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./select_array_attribute.html", "dijit/form/TextBox"//
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, TextBox) {

	return declare("app.SelectArrayWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		_addElement : function() {
			this.target.items.push(new dojo.Stateful({
				value : null,
				options : this.target.options
			}));
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});