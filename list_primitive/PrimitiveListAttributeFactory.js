define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"dojox/mvc/WidgetList",//
"./RepeatedAttributeWidget",//
"../widget/MvcDndSource",//
"../model/ArrayModel",//
"../model/PrimitiveModel",//
"dijit/registry"
], function(array, lang, aspect, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget , DndSource, ArrayModel, PrimitiveModel, registry) {

	return declare( [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && attribute.type=="primitive-array";
		},
		createModel: function(attribute, plainValue) {
			var model = new ArrayModel();
			var ef = function(value) {
				var model = new PrimitiveModel();
				model.update(value);
				return model;
			}
			model.elementFactory = ef;
			model.update(plainValue);
			return model;
			
		},	
		create : function(attribute, modelHandle, ctx) {
			var childAttribute =attribute.element;
			
			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute : attribute,
				childAttribute : childAttribute,
				editorFactory:this.editorFactory
			});

			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedAttributeWidget);
			widgetList.set("childParams", {
				meta : childAttribute,
				_relTargetProp : "modelHandle",
				editorFactory : this.editorFactory,
				ctx: ctx
			});
			if (attribute.reorderable !== false) {
				var copy = function(original) {
					var plainValue= original.getPlainValue();
					var newMh=new PrimitiveModel();
					newMh.update(plainValue);
					newMh.oldValue=plainValue;
					return newMh;
				}
				aspect.after(widgetList, "startup", function() {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true, withHandles:true});
				});
			}
			select.addChild(widgetList);
			return select;

		}
	})
});
