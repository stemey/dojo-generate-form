define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"./ExpandableDecoratorWidget",//
"./AttributeListWidget",//
"../AttributeFactoryFinder",//
"../Resolver"

], function(array, lang, declare, at, DecoratorWidget, ExpandableDecoratorWidget, AttributeListWidget,
		AttributeFactoryFinder,Resolver) {

	return declare("app.Groupfactory", null, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
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
		create : function(group, modelHandle, resolver) {
			var listWidget = this.createWidget(group);

			array.forEach(group.attributes, function(attribute) {
				var label = attribute.label;
				if (!modelHandle.value) {
					throw new Error("provide a meta object "+attribute.code);
				}
				if (!modelHandle.value[attribute.code]) {
					throw new Error("provide a default value"+attribute.code);
				}
				var childResolver = new Resolver(modelHandle,attribute.code);

				var attributeEditor = this.createAttribute(attribute,
						modelHandle.value[attribute.code], childResolver);
				var widget = this.editorFactory.createDecorator(attribute, modelHandle.value[attribute.code]);
				if (attributeEditor != null) {
					widget.addChild(attributeEditor);
					listWidget.addChild(widget);
				}
			}, this);
			return listWidget;

		},
		getSchema: function() {
				var properties= {"label":{"type":"string"},"description":{"type":"string"},"attributes":{"$ref":"attributes"}}
			var schema={description:"The list displays an array of attributes."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"list",description:"This text is displayed at the top of the list",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	

		}	
	})
});
