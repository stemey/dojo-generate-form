define([
	"dojo/_base/lang",//
	"dojo/aspect",//
	"dojo/_base/declare",//
	"./EmbeddedListWidget",//
	"../widget/MvcDndSource",//
	"../layout/LayoutWidgetList",//
	"./RepeatedEmbeddedWidget",//
	"../model/ArrayModel",//
	"../model/MultiObject"//
], function (lang, aspect, declare, EmbeddedListWidget, DndSource, WidgetList, RepeatedEmbeddedWidget, ArrayModel, MultiObject) {

	var findGroup = function (code, allGroups) {
		var groups = allGroups.filter(function (group) {
			return group.code === code;
		});
		return groups[0];
	};

	return declare([], {
		id: "multi-array",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles: function (attribute) {
			return attribute !== null && attribute.type === "array" && attribute.groups;
		},
		create: function (attribute, modelHandle, ctx) {

			var childMeta = attribute.groups[0];

			var select = new EmbeddedListWidget({
				target: modelHandle,
				group: childMeta,
				typeProperty: attribute.typeProperty,
				editorFactory: this.editorFactory
			});


			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				groups: attribute.groups,
				typeProperty: attribute.typeProperty,
				_relTargetProp: "modelHandle",
				editorFactory: this.editorFactory,
				ctx: ctx
			});
			select.addChild(widgetList);


			if (attribute.reorderable !== false) {
				var copy = function (original) {
					var plainValue = original.getPlainValue();
					return modelHandle.elementFactory(plainValue);
				};
				aspect.after(widgetList, "startup", function () {
					new DndSource(widgetList.domNode, {
						copyFn: copy,
						copyOnly: false,
						singular: true,
						withHandles: true
					});
				});
			}


			return select;

		},
		createModel: function (meta, plainValue) {
			var validators = this.editorFactory.getModelValidators(meta);
			var model = new ArrayModel({schema: meta, validators: validators});
			var me = this;
			var ef = function (value) {
				var model = MultiObject.create({editorFactory: me.editorFactory, schema: meta});
				model.update(value, true, model.initialized);
				return model;
			};
			model.elementFactory = ef;
			model.update(plainValue), true, false;
			return model;
		}
		/* getSchema() is implemented in gform/embedded/EmbeddedAttributeFactory */
	});
});
