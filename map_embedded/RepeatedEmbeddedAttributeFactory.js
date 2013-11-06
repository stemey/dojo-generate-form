define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"../model/MapModel",//
"../list_embedded/EmbeddedListWidget",//
"dojox/mvc/sync",//
"../layout/LayoutWidgetList",//
"../list_embedded/RepeatedEmbeddedWidget",//
"../layout/_LayoutMixin"
], function(array, lang, aspect, Editor, declare, at, MapModel,
		EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget,  _LayoutMixin) {

	return declare([], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && attribute.type=="single-map";
		},
		create : function(attribute, modelHandle) {



			var select = new EmbeddedListWidget({
				target : modelHandle,
				group:attribute.group,
				editorFactory: this.editorFactory
			});

			var childMeta = attribute.group

			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				group : childMeta,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);
			


			return select;

		},
		createModel: function(attribute, plainValue) {
			var model = new MapModel({keyProperty: attribute.keyProperty});
			var me = this;
			var ef = function(value) {
				var model = me.editorFactory.createGroupModel(attribute.group);
				if (value) {
					model.update(value);
				}
				return model;
			}
			model.elementFactory = ef;
			model.update(plainValue);
			return model;
		}
	})
});
