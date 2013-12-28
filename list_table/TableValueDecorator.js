define([  "dojo/_base/declare", "dojo/_base/array", "dijit/_WidgetBase", "dijit/_Container",
	"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/text!./table_value_decorator.html",//
	"../group/_DecoratorMixin"
], function (declare, array, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template, _DecoratorMixin) {

	return declare("gform.list_table.TableValueDecorator", [ _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, _DecoratorMixin], {
		templateString: template,
		updateTypeVisibilty: function (type) {
			if (this.meta && array.indexOf(this.meta.types, type) < 0) {
				this.displayNode.style.display = "none";
				this.modelHandle.ignore = true;
			} else {
				this.displayNode.style.display = "";
				this.modelHandle.ignore = false;
			}
		}
	});

});
