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
], function(array, lang, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget) {

	return declare("app.PrimitiveListAttributeFactory", [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && (typeof attribute.type == "string")
					&& attribute.array;
		},
		create : function(attribute, modelHandle) {

			var model = new dojo.Stateful();

			var items = new StatefulArray([]);
			items.set("primitive", true);
			array.forEach(modelHandle.get(attribute.code), function(e) {
				items.push(new Stateful({
					"value" : e
				}))
			}, this);
			modelHandle.set(attribute.code, items);

			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute : attribute
			});

			var childModel = modelHandle.get(attribute.code);
			var singleAttribute = {};
			var attributes = [ singleAttribute ];
			var childMeta = {
				attributes : attributes
			};
			for ( var key in attribute) {
				singleAttribute[key] = attribute[key];
			}
			singleAttribute.code = "value";
			singleAttribute.array = false;

			var widgetList = new WidgetList();
			widgetList.set("partialrebuild", true);
			widgetList.set("children", items);
			widgetList.set("childClz", RepeatedAttributeWidget);
			widgetList.set("childParams", {
				meta : singleAttribute,
				_relTargetProp : "modelHandle",
				editorFactory : this.editorFactory
			});
			select.addChild(widgetList);

			return select;

		}
	})
});
