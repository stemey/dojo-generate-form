define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./RefListWidget",//
"dojox/mvc/sync",//
"dojox/mvc/WidgetList",//
"./RepeatedAttributeWidget",//
"../widget/MvcDndSource",//
"../model/updateModelHandle",//
"../schema/meta",//
"dijit/registry"
], function(array, lang, aspect, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget , DndSource, updateModelHandle, metaHelper, registry) {

	return declare( [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
				return metaHelper.isType(attribute,"ref")
						&& attribute.array;
		},
		create : function(attribute, modelHandle, ctx) {
			if (modelHandle.value==null) {
				throw new "provide a default value";//modelHandle.value=new StatefulArray([]);
			}	
			var childAttribute ={};
			lang.mixin(childAttribute, attribute)
			childAttribute.array=false;
			childAttribute.targetCreatable=false;
			delete childAttribute.editor;
			
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
					var newMh=updateModelHandle.createMeta();
					newMh.value=original.value;
					newMh.oldValue=original.oldValue;
					return newMh;
				}
				aspect.after(widgetList, "startup", function() {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true});
				});
			}
			select.addChild(widgetList);
			return select;

		}
	})
});
