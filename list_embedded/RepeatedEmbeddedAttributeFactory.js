define([ "dojo/_base/array", //
"dojo/_base/lang",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"dojox/mvc/WidgetList",//
"./RepeatedEmbeddedWidget",//
"../updateModelHandle",//
"dojox/mvc/StatefulArray"
], function(array, lang, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle, StatefulArray) {

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
				modelHandle.value=new StatefulArray([]);
			}	

			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute:attribute
			});

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

			return select;

		},
		updateModelHandle: function(meta,plainValue,modelHandle) {
			updateModelHandle.updateArray(meta,plainValue,modelHandle,this.editorFactory);
		}
	})
});
