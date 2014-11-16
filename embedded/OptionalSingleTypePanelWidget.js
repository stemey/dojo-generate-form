define([
	"dojo/_base/declare", "./SingleTypePanelWidget", "dojo/text!./singletype_embedded_attribute.html",
	"../group/_DecoratorMixin", "dijit/form/CheckBox"
], function (declare, SingleTypePanelWidget, template, DecoratorMixin) {

	return declare([SingleTypePanelWidget, DecoratorMixin], {

		templateString: null,
		doLayout: true,
		required: false,
		constructor: function (config) {
			this.label = config.meta && (config.meta.label || config.meta.code) || "";
			this.templateString = template;
			this.required = false;
		}

	});

});
