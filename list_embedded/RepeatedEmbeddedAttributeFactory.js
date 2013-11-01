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

	return declare([], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && attribute.type == "single-array";
		},
		create : function(attribute, modelHandle) {

			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute:attribute,
				editorFactory: this.editorFactory
			});

			// TODO we need to clone here
			var childMeta = attribute.group

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
				var me = this;
				var copy = function(original) {
					var plainValue= original.getPlainValue();
					var newMh=me.editorFactory.createGroupModel(group);
					newMh.update(plainValue);
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
		createModel: function(meta,plainValue) {
			var model = new ArrayModel();
			model.update(plainValue);
			return model;
		},
/* getSchema() is implemented in gform/embedded/EmbeddedAttributeFactory */
	})
});
