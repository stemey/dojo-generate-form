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
"../model/updateModelHandle",//
"dijit/registry"
], function(array, lang, aspect, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget , DndSource, updateModelHandle, registry) {

	return declare("app.PrimitiveListAttributeFactory", [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && !attribute.validTypes && attribute.array;
		},
		create : function(attribute, modelHandle) {

			
			if (modelHandle.value==null) {
				modelHandle.value=new StatefulArray([]);
			}	
			var childAttribute ={};
			lang.mixin(childAttribute, attribute)
			childAttribute.array=false;
			
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
				editorFactory : this.editorFactory
			});
			var copy = function(original) {
				var newMh=updateModelHandle.createMeta();
				newMh.value=original.value;
				newMh.oldValue=original.oldValue;
				return newMh;
			}
			aspect.after(widgetList, "startup", function() {
				new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true});
			});
			select.addChild(widgetList);

			

			
			

			return select;

		}
	})
});
