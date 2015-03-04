define([
	'dojo/_base/declare',
	'./AbstractGroupPanelWidget',
	'gform/layout/_InvisibleMixin',
	'dojo/text!./polymorphic_embedded_attribute_layout.html'
], function (declare, AbstractGroupPanelWidget, _InvisibleMixin, template) {

	return declare([AbstractGroupPanelWidget, _InvisibleMixin], {
		templateString: template
	});

});
