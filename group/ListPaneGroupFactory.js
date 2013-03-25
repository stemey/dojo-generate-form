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
	},
		getSchema: function() {
				var properties= {"label":{"type":"string"},"description":{"type":"string"},"attributes":{"$ref":"attributes"}}
			var schema={description:"The listpane displays an array of attributes in a list. It is useful inside dijit layout containers because it wraps its content in a 'dijit.layout.ContentPane'."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"listpane",label:"Tab name for display in tab",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	
		}
	})
});
