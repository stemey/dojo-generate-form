define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"./ExpandableDecoratorWidget",//
"./AttributeListWidget",//
], function(array, lang, declare, at, DecoratorWidget, ExpandableDecoratorWidget, AttributeListWidget,
		Resolver) {
// module
//		gform/group/GroupFactory



	return declare("gform.group.GroupFactory", [], {
		// summary:
		//		this factory handles simple groups containing an array of attributes. Creates an instance of ./AttributeListWidget
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createAttribute : function(attribute, modelHandle,ctx) {
		// summary:
		//		creates a widget for an embedded attribute.	
			var factory = this.editorFactory.attributeFactoryFinder.getFactory(attribute);
			if (factory != null) {
				return factory.create(attribute, modelHandle,ctx);
			} else {
				return null;
			}
		},
		createWidget: function(group) {
		// summary:
		//		return the widget for the group.
		// group: Object
		//		group meta data
		// returns: dijit/_Container
		//		the container, that the attribute widgets will be added to.		
			return new AttributeListWidget({meta:group});
		},	
		create : function(group, modelHandle, ctx) {
			var listWidget = this.createWidget(group);

			array.forEach(group.attributes, function(attribute) {
				var label = attribute.label;
				if (!modelHandle.value) {
					throw new Error("provide a meta object "+attribute.code);
				}
				if (!modelHandle.value[attribute.code]) {
					throw new Error("provide a default value"+attribute.code);
				}
	
				var attributeEditor = this.createAttribute(attribute,
						modelHandle.value[attribute.code], ctx);
				var widget = this.editorFactory.createDecorator(attribute, modelHandle.value[attribute.code]);
				if (attributeEditor != null) {
					widget.addChild(attributeEditor);
					listWidget.addChild(widget);
				}
			}, this);
			return listWidget;

		},
		getSchema: function() {
				var properties= {"label":{"type":"string", description:"This label is displayed in a tab."},"description":{"type":"string", "description": "text displayed above the attributes"},"attributes":{"$ref":"attributes"}}
			var schema={description:"The list displays an array of attributes."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"list",description:"This text is displayed at the top of the list",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	

		}	
	})
});
