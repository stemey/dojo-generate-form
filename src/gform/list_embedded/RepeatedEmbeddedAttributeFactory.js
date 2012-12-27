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
], function(array, lang, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget) {

	return declare("app.RepeatedEmbeddedAttributeFactory", [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && ((attribute.type && 	attribute.type.attributes) || attribute.validTypes)
					&& attribute.array;
		},
		create : function(attribute, modelHandle) {

			var model = new dojo.Stateful();
			
			var items = new StatefulArray([]);
			array.forEach(modelHandle.get(attribute.code),function(e){items.push(new Stateful(e))},this);
			modelHandle.set(attribute.code, items);

			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute:attribute.code
			});

			var childModel = modelHandle.get(attribute.code);
			var childMeta = attribute.validTypes? attribute:attribute.type;

			var widgetList = new WidgetList();
			widgetList.set("partialrebuild", true);
			widgetList.set("children", items);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta : childMeta,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);

			return select;

		}
	})
});
