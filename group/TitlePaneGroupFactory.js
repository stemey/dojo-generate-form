define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"./GroupFactory",//
"./TitlePane"//
], function(array, lang, declare, aspect, GroupFactory, TitlePane) {

	return declare([ GroupFactory ], {
		createWidget : function(group, model) {
			titlePane = new TitlePane({
				meta : group,
				title : group.title,
				open : group.open
			});
			//make pane content scrollable. important for usage in layout containers	
			titlePane.containerNode.style.overflow="auto";
			aspect.after(model, "onChanged", lang.hitch(this,"onChanged",titlePane, model));
			return titlePane;
		},
		
		onChanged: function(titlePane,model) {
			var titlePaneWidget = e.source;
			var titlePane = titlePaneWidget.get("meta");
			if (model.get("errorCount") > 0) {
				titlePaneWidget.set("title", titlePane.title + "<span class='errorTooltipNode'>" + titlePaneWidget.get("errorCount") + "</span>");
			} else {
				titlePaneWidget.set("title", titlePane.title);
			}
		},
		getSchema: function(){
			var properties=  {"title":{"type":"string", description: "the title of the pane"},"attributes":{"$ref":"attributes"}};
			var schema={description:"The titlepane displays an array of attributes in a 'dijit.TitlePane'."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"titlepane",title:"1.",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	
		}	
	});
});
