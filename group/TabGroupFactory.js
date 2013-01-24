
define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/layout/TabContainer",//
"./DecoratorWidget",//
"../AttributeFactoryFinder"

], function(array, lang, declare, at, TabContainer, DecoratorWidget,
		AttributeFactoryFinder) {

	return declare("app.Groupfactory", null, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createAttribute : function(attribute, modelHandle) {
			var factory = this.editorFactory.attributeFactoryFinder.getFactory(attribute.editor);
			return factory.create(attribute, modelHandle);
		},
		create : function(group, modelHandle) {
			 var tc = new TabContainer({
        		    style: "height: 100%; width: 100%;"
       			 });
			array.forEach(group.tabs, function(tab) {
				var tabWidget = this.editorFactory.create(tab,modelHandle);				
				tabWidget.set("title",tab.label);
				tc.addChild(tabWidget);
				
			}, this);
			tc.selectChild(tc.getChildren()[0]);
			return tc;

		}
	})
});
