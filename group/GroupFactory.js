define([
	"dojo/_base/array",
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
            if (factory !== null) {
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
            var validators = this.editorFactory.getModelValidators(schema);
			var model = new SingleObject({schema:schema, validators:validators, editorFactory:this.editorFactory});
			model.update(plainValue);
			model.typeCode = schema.code;
			return model;
		},
		create: function (group, modelHandle, ctx) {
			var listWidget = this.createWidget(group, modelHandle);

			array.forEach(group.attributes, function (attribute) {
				var attributeModel = modelHandle.getModel(attribute.code);
				var attributeEditor = this.createAttribute(attribute, attributeModel, ctx);
				var widget = this.editorFactory.createDecorator(attribute, attributeModel);
				if (attributeEditor !== null) {
					widget.addChild(attributeEditor);
					listWidget.addChild(widget);
				}
			}, this);
			return listWidget;

        }
    });
});
