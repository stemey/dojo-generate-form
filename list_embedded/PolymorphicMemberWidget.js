define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",
		"dojo/text!./polymorphic_embedded_attribute.html", "../embedded/GroupPanelWidget"	
], function(array, lang, declare, template, GroupPanelWidget) {

	return declare("gform.PolymorphicMemberWidget", [ GroupPanelWidget ], {
		templateString : template,
		nullable:false

	});

});
