define([ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/text!./table_element_decorator.html"//
], function(lang, declare, array, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

	return declare("gform.list_table.TableElementDecorator", [ _WidgetBase, _Container, _TemplatedMixin,
			_WidgetsInTemplateMixin ], {
		templateString : template,
		updateTypeVisibilty : function(type) {
			if (this.meta && array.indexOf(this.meta.types, type) < 0) {
				this.getChildren()[0].domNode.style.display = "none";
			} else {
				this.getChildren()[0].domNode.style.display = "";
			}
		}
	});

});
