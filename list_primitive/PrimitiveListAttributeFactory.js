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
"./RepeatedAttributeWidget",//
"dojox/mvc/StatefulArray"
], function(array, lang, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget ,StatefulArray) {

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
			
			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute : attribute,
				editorFactory:this.editorFactory
			});

			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedAttributeWidget);
			widgetList.set("childParams", {
				meta : attribute,
				_relTargetProp : "modelHandle",
				editorFactory : this.editorFactory
			});
			select.addChild(widgetList);

			return select;

		}
	})
});
