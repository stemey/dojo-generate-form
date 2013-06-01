define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",
		"dojo/text!./polymorphic_embedded_attribute.html", "../embedded/GroupPanelWidget"	, "../layout/_LayoutMixin"
], function(array, lang, declare, template, GroupPanelWidget, _LayoutMixin) {

	return declare("gform.PolymorphicMemberWidget", [ GroupPanelWidget, _LayoutMixin ], {
		templateString : template,
		nullable:false

	});

});
