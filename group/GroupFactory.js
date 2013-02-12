define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"./ExpandableDecoratorWidget",//
"./AttributeListWidget",//
"../AttributeFactoryFinder",//
"../getStateful",
"../Resolver"

], function(array, lang, declare, at, DecoratorWidget, ExpandableDecoratorWidget, AttributeListWidget,
		AttributeFactoryFinder,getStateful,Resolver) {

	return declare("app.Groupfactory", null, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		useExpandable:false,	
		createAttribute : function(attribute, modelHandle,resolver) {
			var factory = this.editorFactory.attributeFactoryFinder.getFactory(attribute);
			if (factory != null) {
				return factory.create(attribute, modelHandle,resolver);
			} else {
				return null;
			}
		},
		createWidget: function(group) {
			return new AttributeListWidget({meta:group});
		},	
		create : function(group, modelHandle) {
			var listWidget = this.createWidget(group);
			array.forEach(group.attributes, function(attribute) {
				var label = attribute.label;
				if (!modelHandle.value[attribute.code]) {
					throw new Error("provide a default value");//modelHandle.value[attribute.code]=getStateful(null);
				}
				var attributeEditor = this.createAttribute(attribute,
						modelHandle.value[attribute.code],new Resolver(modelHandle));
				if (this.useExpandable && (attribute.type.attributes || attribute.validTypes))
				{
					var widget = new ExpandableDecoratorWidget({
						meta : attribute,
						modelHandle: modelHandle.value[attribute.code]
					});
				}else{
					var widget = new DecoratorWidget({
						meta : attribute,
						modelHandle: modelHandle.value[attribute.code]
					});
				}
				if (attributeEditor != null) {
					widget.addChild(attributeEditor);
					listWidget.addChild(widget);
				}
			}, this);
			return listWidget;

		}
	})
});
