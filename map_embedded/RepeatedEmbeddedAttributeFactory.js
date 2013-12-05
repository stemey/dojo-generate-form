define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"../model/MapModel",
	"../list_embedded/EmbeddedListWidget",
	"../layout/LayoutWidgetList",
	"../list_embedded/RepeatedEmbeddedWidget"
], function (lang, declare, MapModel, EmbeddedListWidget, LayoutWidgetList, RepeatedEmbeddedWidget) {

	return declare([], {
		id: "map",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles: function (attribute) {
			return attribute != null && attribute.type === "map" && attribute.group;
		},
		create: function (attribute, modelHandle) {


			var select = new EmbeddedListWidget({
				target: modelHandle,
				group: attribute.group,
				editorFactory: this.editorFactory
			});

			var childMeta = attribute.group;

			var widgetList = new LayoutWidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				group: childMeta,
				_relTargetProp: "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);


			return select;

		},
		createModel: function (attribute, plainValue) {
			var validators = this.editorFactory.getModelValidators(attribute);
			var model = new MapModel({keyProperty: attribute.keyProperty, validators: validators});
			var me = this;
			var ef = function (value) {
				var model = me.editorFactory.createGroupModel(attribute.group);
				if (value) {
					model.update(value);
				}
				return model;
			};
			model.elementFactory = ef;
			model.update(plainValue);
			return model;
		}
	});
});
