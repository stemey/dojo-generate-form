define([
	'dojo/_base/declare',
	'./AbstractGroupPanelWidget',
	'gform/layout/_LayoutMixin',
	'dojo/text!./polymorphic_embedded_attribute.html'
], function (declare, AbstractGroupPanelWidget, LayoutMixin, template) {

	return declare([AbstractGroupPanelWidget, LayoutMixin], {
		templateString: template
	});

});
