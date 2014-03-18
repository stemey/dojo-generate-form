define([
	"../model/PrimitiveModel",
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/_base/declare",
	"./RefListWidget",
	"./PrimitiveListAttributeFactory",
	"dojox/mvc/WidgetList",
	"./RepeatedAttributeWidget",
	"../widget/MvcDndSource"
], function (PrimitiveModel, lang, aspect, declare, EmbeddedListWidget, PrimitiveListAttributeFactory, RefListWidget, RepeatedAttributeWidget, DndSource) {
// module: 
//		gform/list_primitive/RefListAttributeFactory

	return declare([PrimitiveListAttributeFactory], {
		// summary:
		//		creates a list of ref attributes.
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles: function (attribute) {
			return attribute.type === "array" && attribute.element && attribute.element.type === "ref";
		},
		create: function (attribute, modelHandle, ctx) {
			if (modelHandle.value == null) {
				throw new "provide a default value";
			}
			var childAttribute = attribute.element;

            var refConverter = this.editorFactory.getConverter(attribute.element, ctx);

			var select = new EmbeddedListWidget({
				target: modelHandle,
				attribute: attribute,
				childAttribute: childAttribute,
				editorFactory: this.editorFactory,
				opener: ctx.opener,
                converter: refConverter
			});



            var widgetList = new RefListWidget();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedAttributeWidget);
			widgetList.set("childParams", {
				meta: childAttribute,
				_relTargetProp: "modelHandle",
				editorFactory: this.editorFactory,
				ctx: ctx,
                converter: refConverter
			});
			if (attribute.reorderable !== false) {
				var copy = function (original) {
					var plainValue = original.getPlainValue();
					var newMh = new PrimitiveModel();
					newMh.update(plainValue);
					newMh.oldValue = plainValue;
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
