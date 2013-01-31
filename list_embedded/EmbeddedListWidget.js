define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./embedded_list_attribute.html", "../getStateful"//
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, getStateful) {

	return declare("app.EmbeddedListWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		_addElement : function() {
			var type=this.attribute.validTypes[0].code;
			this.target.value.push(getStateful({ext_type:type}));
			this.emit("valid-changed");
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});
