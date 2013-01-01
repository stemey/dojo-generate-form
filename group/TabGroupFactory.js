
define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/layout/TabContainer",//
"./DecoratorWidget",//
"./AttributeListWidget",//
"../AttributeFactoryFinder"

], function(array, lang, declare, at, TabContainer, DecoratorWidget,
		AttributeListWidget,AttributeFactoryFinder) {

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
       			 }, "tc1-prog");
			array.forEach(group.tabs, function(tab) {
				var tab = new AttributeListWidget({
					title: tab.label
				});
				tc.addChild(tab);
				array.forEach(tab.attributes, function(attribute) {
					var label = attribute.label;
					var widget = new DecoratorWidget({
						label : label
					});
					var attributeEditor = this.createAttribute(attribute,
							modelHandle);
					if (attributeEditor != null) {
						widget.addChild(attributeEditor);
						tab.addChild(widget);
					}
				}, this);
			}, this);
			return tc;

		}
	})
});
