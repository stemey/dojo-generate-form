define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		 "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./table_element_header.html"//
], function(lang, declare, _WidgetBase, _TemplatedMixin,
		_WidgetsInTemplateMixin, template) {

	return declare("gform.list_table.TableElementHeader", [ _WidgetBase,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		constructor: function(kwargs) {
			this.label = kwargs.label;
			this.description = kwargs.description;
		},
		startup: function() {
			if (this.description) {
				new Tooltip({
				      connectId: [this.descriptionTooltipNode],
				      label: this.description
				  });
				} else {
					this.descriptionTooltipNode.style.display="none";
				}
		},
		templateString : template,
	});

});
