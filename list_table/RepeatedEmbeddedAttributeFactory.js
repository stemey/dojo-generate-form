define([ "dojo/_base/array", //
"dojo/_base/lang",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"./TableWidgetList",//
"./RepeatedEmbeddedWidget",//
"../getStateful",//
"./TableHeader",//
"./TableElementHeader",//
"./mergeAttributeDefinitions"
], function(array, lang, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, getStateful,TableHeader,TableElementHeader,mergeAttributeDefinitions) {

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

				
			var tableHeader =new TableHeader();
			if (attribute.validTypes.length>1) {
				tableHeader.addChild(new TableElementHeader({label:attribute.type_property}));
				
			}


			array.forEach(mergeAttributeDefinitions(attribute.validTypes),function(attribute) {
				tableHeader.addChild(new TableElementHeader({label:attribute.label}));
			},this);
			select.addChild(tableHeader);
			
			var widgetList = new WidgetList();
			widgetList.set("partialrebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta : attribute,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);

			return select;

		}
	})
});
