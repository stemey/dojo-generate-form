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
"dojox/mvc/StatefulArray",//
"dojo/dnd/Source",//
"../model/updateModelHandle",//
"dijit/registry"
], function(array, lang, aspect, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget ,StatefulArray, DndSource, updateModelHandle, registry) {

	return declare("app.PrimitiveListAttributeFactory", [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && !attribute.validTypes && attribute.array;
		},
		_getModelHandleValue: function() {
			return this.modelHandle.value;
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
			select.addChild(widgetList);
			
			aspect.after(widgetList, "startup", function() {
				var dndSource=new DndSource(widgetList.domNode, {copyOnly:false, singular:true});
				widgetList.dndSource= dndSource;
				dndSource.onDropInternal= function(nodes, copy) {
					var sarray= modelHandle.value;
					var anchorModelHandle = registry.byNode(dndSource.targetAnchor);
					var anchorPos = widgetList.getChildren().indexOf(anchorModelHandle);
					var dragged = null;
					for (var key in dndSource.selection) {
						dragged=key;
						break;
					}
					var currentModelHandle = registry.byId(dragged);
					var currentPos = widgetList.getChildren().indexOf(currentModelHandle);
					dndSource._removeSelection()
					console.log(" move from "+currentPos+" to "+anchorPos);
					var removed = modelHandle.value.splice(currentPos, 1)[0]; 
					if (anchorPos>currentPos) {
						anchorPos--;
					}
					var newMh=updateModelHandle.createMeta();
					newMh.value=removed.value;
					modelHandle.value.splice(anchorPos, 0, newMh) 
					dndSource.sync();

				};
				
			});
			
			

			return select;

		}
	})
});
