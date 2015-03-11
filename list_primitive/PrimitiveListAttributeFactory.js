define([
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/_base/declare",
	"./EmbeddedListWidget",
	"dojox/mvc/WidgetList",
	"./RepeatedAttributeWidget",
	"../widget/MvcDndSource",
	"../model/ArrayModel"
], function (lang, aspect, declare, EmbeddedListWidget, WidgetList, RepeatedAttributeWidget, DndSource, ArrayModel) {

	return declare([], {
		id: "primitive-array",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles: function (attribute) {
			return attribute !== null && attribute.type === "array" && attribute.element;
		},
		createModel: function (attribute) {
			var validators = this.editorFactory.getModelValidators(attribute);
			var model = new ArrayModel({schema: attribute, validators: validators});
			var me = this;
			var ef = function (value) {
				var elementModel = me.editorFactory.createAttributeModel(attribute.element);
                elementModel.update(value,false,model.initialized);
                return elementModel;
			};
			model.elementFactory = ef;
			return model;

		},
		create: function (attribute, modelHandle, ctx) {
			var childAttribute = attribute.element;

			var select = new EmbeddedListWidget({
				target: modelHandle,
				attribute: attribute,
				childAttribute: childAttribute,
				editorFactory: this.editorFactory
			});

			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedAttributeWidget);
			widgetList.set("childParams", {
				meta: childAttribute,
				_relTargetProp: "modelHandle",
				editorFactory: this.editorFactory,
				ctx: ctx
			});
			if (attribute.reorderable !== false) {
				var copy = function (original) {

					var newMh = modelHandle.elementFactory(null);
                    return newMh;
				};
				aspect.after(widgetList, "startup", function () {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly: false, singular: true, withHandles: true});
				});
			}
			select.addChild(widgetList);
			return select;

		}
	});
});
