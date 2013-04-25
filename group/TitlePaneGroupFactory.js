define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./GroupFactory",//
"./TitlePane"//
], function(array, lang, declare, GroupFactory, TitlePane) {

	return declare("gform.TitlePaneGroupFactory", [ GroupFactory ], {
		createWidget : function(group) {
			titlePane = new TitlePane({
				meta : group,
				title : group.title,
				open : group.open
			});
			//make pane content scrollable. important for usage in layout containers	
			titlePane.containerNode.style.overflow="auto";
			titlePane.on("valid-changed", lang.hitch(this,"onValidChanged"));
			return titlePane;
		},
		
		onValidChanged: function(e) {
			var titlePaneWidget = e.source;
			var titlePane = titlePaneWidget.get("meta");
			if (titlePaneWidget.get("errorCount") > 0) {
				titlePaneWidget.set("title", titlePane.title + "(<span class='errorTooltipNode'>" + titlePaneWidget.get("errorCount") + "</span>)");
			} else {
				titlePaneWidget.set("title", titlePane.title);
			}
		},
		collectAttributes: function(group) {
			var attributes=[];
			array.forEach(group.attributes, function(attribute) {
				attributes.push(attribute);
			},this);
			return attributes;
		},
		getSchema: function(){
			var properties=  {"title":{"type":"string"},"attributes":{"$ref":"attributes"}};
			var schema={description:"The titlepane displays an array of attributes in a 'dijit.TitlePane'."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"titlepane",title:"1.",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	
		}	
	});
});
