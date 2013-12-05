define([ "dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./AttributeListWidget",
	"../model/SingleObject"
], function (array, lang, declare, AttributeListWidget, SingleObject) {
// module
//		gform/group/GroupFactory


	return declare([], {
		// summary:
		//		this factory handles simple groups containing an array of attributes. Creates an instance of ./AttributeListWidget

		id: "group",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createAttribute: function (attribute, modelHandle, ctx) {
			// summary:
			//		creates a widget for an embedded attribute.
			var factory = this.editorFactory.attributeFactoryFinder.getFactory(attribute);
			if (factory != null) {
				return factory.create(attribute, modelHandle, ctx);
			} else {
				return null;
			}
		},
		createWidget: function (group) {
			// summary:
			//		return the widget for the group.
			// group: Object
			//		group meta data
			// returns: dijit/_Container
			//		the container, that the attribute widgets will be added to.
			return new AttributeListWidget({meta: group});
		},
		createModel: function (schema, plainValue) {
			var attributes = {};
			if (schema.attributes) {
				schema.attributes.forEach(function (attribute) {
					var attributeValue = plainValue ? plainValue[attribute.code] : null;
					attributes[attribute.code] = this.editorFactory.createAttributeModel(attribute, attributeValue);
				}, this);
			}
			var model = new SingleObject({attributes: attributes, subgroup: true});
			model.update(plainValue);
			model.typeCode = schema.code;
			return model;
		},
		create: function (group, modelHandle, ctx) {
			var listWidget = this.createWidget(group, modelHandle);

			array.forEach(group.attributes, function (attribute) {
				var label = attribute.label;

				var attributeModel = modelHandle.getModel(attribute.code);
				var attributeEditor = this.createAttribute(attribute, attributeModel, ctx);
				var widget = this.editorFactory.createDecorator(attribute, attributeModel);
				if (attributeEditor != null) {
					widget.addChild(attributeEditor);
					listWidget.addChild(widget);
				}
			}, this);
			return listWidget;

		},
		getSchema: function () {
			var properties = {"label": {"type": "string", description: "This label is displayed in a tab."}, "description": {"type": "string", "description": "text displayed above the attributes"}, "attributes": {"$ref": "attributes"}}
			var schema = {description: "The list displays an array of attributes."};
			schema.properties = properties;
			schema.required = ["attributes"];
			var example = {groupType: "list", description: "This text is displayed at the top of the list", attributes: [
				{code: "name", type: "string"}
			]};
			schema.example = dojo.toJson(example, true);
			return schema;

		}
	});
});
