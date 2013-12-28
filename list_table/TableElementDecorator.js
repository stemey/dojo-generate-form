define([  "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
	"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/text!./table_element_decorator.html"
], function (declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

	return declare("gform.list_table.TableElementDecorator", [ _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template
	});

});
