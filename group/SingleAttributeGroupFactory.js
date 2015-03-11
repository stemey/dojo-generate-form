define([
	"dojo/_base/declare",
	"./SingleDecoratorWidget",
	"dijit/layout/BorderContainer",
	"dojo/_base/lang",
	"../model/SingleObject"

], function (declare, SingleDecoratorWidget, BorderContainer, lang, SingleObject) {

	return declare("gform.group.SingleAttributeGroupFactory", [], {
		id: "single",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createModel: function (schema) {
			var normalizedSchema = {};
			lang.mixin(normalizedSchema, schema);
			normalizedSchema.attributes = [schema.attribute];
			var validators = this.editorFactory.getModelValidators(normalizedSchema);
			var model = new SingleObject({
				schema: normalizedSchema,
				validators: validators,
				editorFactory: this.editorFactory
			});
			model.typeCode = schema.code;
			return model;
		},
		create: function (group, modelHandle, ctx) {
			var attribute = group.attribute;
			var attributeModel = modelHandle.getModel(attribute.code);
			var attributeFactory = this.editorFactory.getAttributeFactory(attribute, attributeModel, ctx);
			var attributeEditor = attributeFactory.create(attribute, attributeModel, ctx);
			var preferredDecorator = attributeFactory.getPreferredDecorator ? attributeFactory.getPreferredDecorator(attribute) : null;
			if (preferredDecorator === "none") {
				return attributeEditor;
			} else {
				var widget = new BorderContainer({gutters: false, class: "singleDecorator"});
				var decorator = new SingleDecoratorWidget({
					meta: attribute,
					modelHandle: attributeModel,
					region: 'top'
				});
				widget.addChild(decorator);
				if (attributeEditor !== null) {
					attributeEditor.region = "center";
					widget.addChild(attributeEditor);
				}
				return widget;
			}


		}
	});
});
