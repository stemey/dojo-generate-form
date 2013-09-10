define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"dojox/mvc/WidgetList",//
"./RepeatedAttributeWidget",//
"../../model/updateModelHandle",//
"dijit/registry",
"./Link",
"dojox/mobile/ToolBarButton",
"dojox/mobile/Button",
], function(array, lang, aspect,  declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget ,  updateModelHandle, registry, Link, ToolBarButton) {

	return declare( [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && !attribute.validTypes && attribute.array;
		},
		create : function(attribute, modelHandle, ctx) {
			if (modelHandle.value==null) {
				throw new "provide a default value";//modelHandle.value=new StatefulArray([]);
			}	
			var childAttribute ={};
			lang.mixin(childAttribute, attribute)
			childAttribute.array=false;
			delete childAttribute.editor;
			
			
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
				editorFactory : this.editorFactory,
				ctx: ctx
			});

			select.addChild(widgetList);

			var view =ctx.createView();
			view.addChild(select);

			var addButton = new ToolBarButton({label:'+', style:{float:"right"}});
			view.heading.addChild(addButton);
			addButton.on("click", lang.hitch(select,"addElement"));


			
	


			var transition=function() {ctx.transitionTo(view)};
			var link = new Link({label:"weiter", transition:transition});
			return link;

		}
	})
});
