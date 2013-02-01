define([ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/text!./table_element_decorator.html"
], function(lang, declare, array, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

	return declare("gform.list_table.TableElementDecorator", [ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template
	});

});
