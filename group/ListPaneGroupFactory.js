define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupFactory",//
"dijit/layout/ContentPane",//
"../AttributeFactoryFinder",//
"dojo/on",//
"../visit",//
"./ListPane"

], function(array, lang, declare, at, GroupFactory,  ListPaneGroupWidget,
		AttributeFactoryFinder, on, visit,ListPane,_GroupMixin) {

	return declare("gform.ListPaneGroupFactory", [GroupFactory], {
		createWidget : function(group) {
			return new ListPane({meta:group});
	}
	})
});
