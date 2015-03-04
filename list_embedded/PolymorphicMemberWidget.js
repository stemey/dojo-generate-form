define([
	"dojo/_base/declare",
	"dojo/text!./polymorphic_embedded_attribute.html",
	"../embedded/GroupPanelWidget",
	"../widget/GroupSelect"
], function (declare, template, GroupPanelWidget) {

	return declare("gform.PolymorphicMemberWidget", [GroupPanelWidget], {
		templateString: template,
		nullable: false,
		doLayout: false

	});

});
