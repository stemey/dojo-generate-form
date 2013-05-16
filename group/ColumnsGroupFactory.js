define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupFactory",//
"../layout/ColumnContainer",//
"../AttributeFactoryFinder",//
"dojo/on",//
"./ListPane",//
"./DescriptionWidget"

], function(array, lang, declare, at, GroupFactory,  ColumnContainer,
		AttributeFactoryFinder, on, ListPane, DescriptionWidget, _GroupMixin) {

	return declare("gform.ColumnsGroupFactory", [GroupFactory], {
		createWidget : function(group) {
			var pane = new ColumnContainer({meta:group});
			//pane.addChild(new DescriptionWidget({description:group.description}));
			return pane;
	},
		getSchema: function() {
				var properties= {"label":{"type":"string"},"attributes":{"$ref":"attributes"}}
			var schema={description:"This pane arranges its attributes in columns. The maximum of the children's width is calculated and the corresponding number of columns are used. This group is useful for lots of primitive attributes. complex attributes may be nested and are usually not easily arranged in columns with fixed width. <br/>This dijit uses css-columns, which is a relatively new feature and not supported in older browsers. The attribute's nodes must have a calculatable width."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"columnsgroup",label:"Tab name for display in tab",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	
		}
	})
});
