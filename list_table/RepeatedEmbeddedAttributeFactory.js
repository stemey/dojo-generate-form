define(["dojo/_base/array", //
	"dojo/_base/lang",//
	"dojo/aspect",//
	"dojo/_base/declare",//
	"../model/ArrayModel",//
	"../widget/MvcDndSource",//
	"./EmbeddedListWidget",//
	"./TableWidgetList",//
	"./RepeatedEmbeddedWidget",//
	"../model/MergedMultiObject",//
	"./TableHeader",//
	"./TableElementHeader"//
], function (array, lang, aspect, declare, ArrayModel, DndSource, EmbeddedListWidget, WidgetList, RepeatedEmbeddedWidget, MergedMultiObject, TableHeader, TableElementHeader) {

	return declare([], {
		id: "multi-table",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles: function (attribute) {
			return attribute != null && attribute.type === "array" && attribute.groups;
		},

		create: function (attribute, modelHandle) {

			if (modelHandle.value == null) {
				throw new Error("modelHandle.value should be initialized here");
			}

			var select = new EmbeddedListWidget({
				target: modelHandle,
				attribute: attribute,
				editorFactory: this.editorFactory
			});


			var tableHeader = new TableHeader();
			if (attribute.groups.length > 1) {
				tableHeader.addChild(new TableElementHeader({label: attribute.typeProperty}));

			}

			var attributes = this.mergeAttributeDefinitions(attribute.groups);


			array.forEach(attributes, function (attribute) {
				tableHeader.addChild(new TableElementHeader({
					label: attribute.label || attribute.code,
					description: attribute.description
				}));
			}, this);
			select.addChild(tableHeader);

			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta: attribute,
				combinedAttributes: attributes,
				_relTargetProp: "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);

			if (attribute.reorderable !== false) {
				var copy = function (original) {
					return modelHandle.elementFactory(original.getPlainValue());
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
		_createFactory: function () {
			var me = this;
			var factory = function (childMeta) {
				return me.editorFactory.createAttributeModel(childMeta, null);
			};
			return factory;
		},
		createModel: function (meta) {
			var validators = this.editorFactory.getModelValidators(meta);
			var me = this;
			var model = new ArrayModel({schema: meta, validators: validators});
			model.elementFactory = function (element) {
				var elModel = MergedMultiObject.create(meta, me._createFactory());
				elModel.update(element, false, model.initialized);
				return elModel;
			};
			return model;

		},
		mergeAttributeDefinitions: function (groups) {
			// summary:
			//		merge attributes from all valid types into an array. Consider attributes with the same code as equal and keep only one instance.
			// validTypes: Array
			//		the array of valid types.
			// returns: Array
			//		an array of attributes.
			var combinedAttributes = [];
			var addedAttributes = {};
			array.forEach(groups, function (type) {
				array.forEach(type.attributes, function (attribute) {
					if (!addedAttributes[attribute.code]) {
						attribute.types = [type.code];
						combinedAttributes.push(attribute);
						addedAttributes[attribute.code] = attribute;
					} else {
						addedAttributes[attribute.code].types.push(type.code);
					}
				}, this);
			}, this);
			return combinedAttributes;
		}
	});
});
