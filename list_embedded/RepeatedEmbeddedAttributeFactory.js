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
"../widget/MvcDndSource",//
"../layout/LayoutWidgetList",//
"./RepeatedEmbeddedWidget",//
"../model/updateModelHandle",//
"../model/getPlainValue",//
"dojox/mvc/StatefulArray",//
"../layout/_LayoutMixin"
], function(array, lang, aspect, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, DndSource, WidgetList, RepeatedEmbeddedWidget, updateModelHandle, getPlainValue, StatefulArray, _LayoutMixin) {

	return declare("app.RepeatedEmbeddedAttributeFactory", [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && ((attribute.type && 	attribute.type.attributes) || attribute.validTypes)
					&& attribute.array;
		},
		create : function(attribute, modelHandle) {


			if (modelHandle.value==null) {
				throw new "provide a default value";
			}	


			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute:attribute,
				editorFactory: this.editorFactory
			});

			// TODO we need to clone here
			var childMeta = attribute.validTypes? attribute:attribute.type;

			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta : childMeta,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);
			

			if (attribute.reorderable!==false) {
				var copy = function(original) {
					var plainValue= getPlainValue(original);
					var newMh=updateModelHandle.createMeta();
					if (attribute.validTypes.length>1) {
						updateModelHandle.updatePolyObject(attribute,plainValue,newMh, this.editorFactory);
					}else{
						updateModelHandle.updateObject(attribute,plainValue,newMh, this.editorFactory);
					}
					newMh.oldValue=plainValue;
					return newMh;
				}
				//var copyFn=lang.hitch(this,copy);
				aspect.after(widgetList, "startup", function() {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true, withHandles: true});
				});
			}


			return select;

		},
		updateModelHandle: function(meta,plainValue,modelHandle) {
			updateModelHandle.updateArray(meta,plainValue,modelHandle,this.editorFactory);
		},
/* getSchema() is implemented in gform/embedded/EmbeddedAttributeFactory */
	})
});
