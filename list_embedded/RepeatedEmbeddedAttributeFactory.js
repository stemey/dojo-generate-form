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
"dojox/mvc/StatefulArray",//
"../_LayoutMixin"
], function(array, lang, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle, StatefulArray, _LayoutMixin) {

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
				attribute:attribute,
				editorFactory: this.editorFactory
			});

			var childMeta = attribute.validTypes? attribute:attribute.type;

			var wlc = declare([WidgetList,_LayoutMixin]);;
			var widgetList = new wlc();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta : childMeta,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);
			modelHandle.value.watch(function(){
				var i=0;
				array.forEach(modelHandle.value,
					function(e){
						e.set("index",i++);
					}
				)
			});
				var i=0;
				array.forEach(modelHandle.value,
					function(e){
						e.set("index",i++);
					}
				)
			return select;

		},
		updateModelHandle: function(meta,plainValue,modelHandle) {
			updateModelHandle.updateArray(meta,plainValue,modelHandle,this.editorFactory);
		},
/* getSchema() is implemented in gform/embedded/EmbeddedAttributeFactory */
	})
});
