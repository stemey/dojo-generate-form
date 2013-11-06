define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./RefListWidget",//
"./PrimitiveListAttributeFactory",
"dojox/mvc/sync",//
"dojox/mvc/WidgetList",//
"./RepeatedAttributeWidget",//
"../widget/MvcDndSource",//
"../model/ArrayModel",//
"../schema/meta",//
"../primitive/dijitHelper",//
"dijit/registry"
], function(array, lang, aspect, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, PrimitiveListAttributeFactory, sync, WidgetList, RepeatedAttributeWidget , DndSource,  metaHelper, dijitHelper, registry) {
// module: 
//		gform/list_primitive/RefListAttributeFactory

	return declare( [PrimitiveListAttributeFactory], {
		// summary:
		//		creates a list of ref attributes.
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
				return attribute.type=="ref-array" || (attribute.type=="primitive-array" && attribute.element.type=="ref");
		},
		create : function(attribute, modelHandle, ctx) {
			if (modelHandle.value==null) {
				throw new "provide a default value";//modelHandle.value=new StatefulArray([]);
			}	
			var childAttribute = attribute.element;
			
			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute : attribute,
				childAttribute : childAttribute,
				editorFactory:this.editorFactory,
				opener: ctx.opener
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
