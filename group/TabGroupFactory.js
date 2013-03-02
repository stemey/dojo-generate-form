define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/layout/TabContainer",//
"./DecoratorWidget",//
"../AttributeFactoryFinder",//
"dojo/on"

], function(array, lang, declare, at, TabContainer, DecoratorWidget,
		AttributeFactoryFinder,on) {

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
				tabWidget.set("iconClass", "dijitErrorIcon");
				tc.addChild(tabWidget);
				tc.on("valid-changed", lang.hitch(this,"onValidChanged"));
			}, this);
			tc.selectChild(tc.getChildren()[0]);
			return tc;
		},
		collectAttributes: function(group) {
			var attributes=[];
			array.forEach(group.tabs, function(tab) {
				array.forEach(tab.attributes, function(attribute) {
					attributes.push(attribute);
				},this);
			},this);
			return attributes;
		},
		onValidChanged: function(e) {
			var tabWidget=e.source;
			var tab=tabWidget.get("meta");
			if (tabWidget.get("errorCount")>0) {
				tabWidget.set("iconClass", "dijitIconError");
				tabWidget.set("title", tab.label+"(<span>"+tabWidget.get("errorCount")+"</span>)");
			} else {
				tabWidget.set("iconClass", "");
				tabWidget.set("title", tab.label);
			}
		}	
	})
});
