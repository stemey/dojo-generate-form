define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		 "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./table_element_header.html"//
], function(lang, declare, _WidgetBase, _TemplatedMixin,
		_WidgetsInTemplateMixin, template) {

	return declare("gform.list_table.TableElementHeader", [ _WidgetBase,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
	});

});
