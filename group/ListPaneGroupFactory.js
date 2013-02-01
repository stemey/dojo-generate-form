define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"dijit/layout/ContentPane",//
"../AttributeFactoryFinder",//
"dojo/on",//
"../visit",//
"./ListPane"

], function(array, lang, declare, at, DecoratorWidget,  ListPaneGroupWidget,
		AttributeFactoryFinder, on, visit,ListPane,_GroupMixin) {

	return declare("gform.ListPaneGroupFactory", null, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createAttribute : function(attribute, modelHandle) {
			var factory = this.editorFactory.attributeFactoryFinder.getFactory(attribute);
			if (factory != null) {
				return factory.create(attribute, modelHandle);
			} else {
				return null;
			}
		},
		create : function(group, modelHandle) {
			var listWidget = new ListPane();
			var attributeCodes=[];
			array.forEach(group.type.attributes, function(attribute) {
				var label = attribute.label;
				var attributeEditor = this.createAttribute(attribute,
						modelHandle);
				attributeCodes.push(attribute.code);
				var widget = new DecoratorWidget({
					meta : attribute,
					modelHandle: modelHandle[attribute.code]
				});
				if (attributeEditor != null) {
					widget.addChild(attributeEditor);
					listWidget.addChild(widget);
				}
			}, this);
			return listWidget;

		}
	})
});
