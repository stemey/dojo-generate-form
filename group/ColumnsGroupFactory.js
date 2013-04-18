define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupFactory",//
"../layout/ColumnContainer",//
"../AttributeFactoryFinder",//
"dojo/on",//
"../visit",//
"./ListPane",//
"./DescriptionWidget"

], function(array, lang, declare, at, GroupFactory,  ColumnContainer,
		AttributeFactoryFinder, on, visit,ListPane, DescriptionWidget, _GroupMixin) {

	return declare("gform.ColumnsGroupFactory", [GroupFactory], {
		createWidget : function(group) {
			var pane = new ColumnContainer({meta:group});
			//pane.addChild(new DescriptionWidget({description:group.description}));
			return pane;
	},
		getSchema: function() {
				var properties= {"label":{"type":"string"},"attributes":{"$ref":"attributes"}}
			var schema={description:"The listpane displays an array of attributes in a list. It is useful inside dijit layout containers because it wraps its content in a 'dijit.layout.ContentPane'."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"columnsgroup",label:"Tab name for display in tab",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	
		}
	})
});
