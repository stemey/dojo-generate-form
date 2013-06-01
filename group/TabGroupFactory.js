define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/layout/TabContainer",//
"./DecoratorWidget",//
"../AttributeFactoryFinder",//
"../model/updateModelHandle",
"dojo/on",

], function(array, lang, declare, at, TabContainer, DecoratorWidget,
		AttributeFactoryFinder, updateModelHandle, on) {

	return declare("app.Groupfactory", null, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createAttribute : function(attribute, modelHandle) {
			var factory = this.editorFactory.attributeFactoryFinder
					.getFactory(attribute.editor);
			return factory.create(attribute, modelHandle);
		},
		create : function(group, modelHandle) {
			var tc = new TabContainer({
				style : "height: 100%; width: 100%;"
			});
			array.forEach(group.tabs, function(tab) {
				if (!tab.groupType) {
					tab.groupType="listpane";
				}
				var tabWidget = this.editorFactory.create(tab, modelHandle);
				tabWidget.set("title", tab.label);
				tabWidget.set("meta",tab);
				tc.addChild(tabWidget);
				tc.on("state-changed", lang.hitch(this,"onValidChanged"));
			}, this);
			tc.selectChild(tc.getChildren()[0]);
			return tc;
		},
		collectAttributes: function(group,/*local variables*/attributes) {
			attributes=[];
			array.forEach(group.tabs, function(tab) {
				var subAttributes = updateModelHandle.collectAttributes(tab,this.editorFactory);
				array.forEach(subAttributes,function(a) {
					attributes.push(a);
				});
			},this);
			return attributes;
		},
		onValidChanged: function(e) {
			var tabWidget=e.source;
			var tab=tabWidget.get("meta");
			if (tabWidget.get("errorCount")>0) {
				tabWidget.set("title", tab.label + "<span class='errorTooltipNode'>" + tabWidget.get("errorCount") + "</span>");
			} else {
				tabWidget.set("title", tab.label);
			}
		},		
		getSchema: function() {
			var properties= {	"tabs":{"$ref":"groups"}}
			var example={groupType:"tab",tabs:[{groupType:"listpane",label:"Tab 1",attributes:[]},{groupType:"listpane",label:"Tab 2",attributes:[]}]}
				//schema.example=dojo.toJson(example,true);
			var schema={description:"The tabgroup displays an array of groups in a 'dijit.layout.TabContainer'."};
			schema.properties=properties;
			schema.required=["tabs"];
			schema.example=dojo.toJson(example,true);
			return schema;	
		}
	
	})
});
