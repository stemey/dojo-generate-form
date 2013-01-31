define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin", "../meta",
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful",
		"dojo/text!./embedded_list_attribute.html", "dijit/form/TextBox"//
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin, meta,
		_WidgetsInTemplateMixin,  Stateful,template, TextBox) {

	return declare("app.EmbeddedListWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		attribute:null,
		_addElement : function() {
			var defaultValue = meta.getDefaultAttributeValue(this.attribute);
			this.target.value.push(new Stateful({value:defaultValue}));
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});
