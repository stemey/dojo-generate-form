define([
	"dojo/_base/declare",
	"dojo/text!./polymorphic_embedded_attribute.html",
	"../embedded/GroupPanelWidget",
	"../layout/_LayoutMixin",
	"../widget/GroupSelect"
], function (declare, template, GroupPanelWidget, _LayoutMixin) {

	return declare("gform.PolymorphicMemberWidget", [ GroupPanelWidget, _LayoutMixin ], {
		templateString: template,
		nullable: false,
		doLayout:false

	});

});
