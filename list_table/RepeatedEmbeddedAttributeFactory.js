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
"../updateModelHandle",//
"./TableHeader",//
"./TableElementHeader",//
"./mergeAttributeDefinitions"
], function(array, lang, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle,TableHeader,TableElementHeader,mergeAttributeDefinitions) {

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
				throw new Error("modelHandle.value should be initialized here");
			}
			
			var combinedAttributes=updateModelHandle.mergeAttributeDefinitions(attribute.validTypes	);

			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute:attribute
			});

				
			var tableHeader =new TableHeader();
			if (attribute.validTypes.length>1) {
				tableHeader.addChild(new TableElementHeader({label:attribute.type_property}));
				
			}


			array.forEach(combinedAttributes,function(attribute) {
				tableHeader.addChild(new TableElementHeader({label:attribute.label}));
			},this);
			select.addChild(tableHeader);
			
			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta : attribute,
				combinedAttributes: combinedAttributes,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);

			return select;

		},
		updateObject: function (meta,plainValue,modelHandle) {
			if (meta.validTypes.length==1) {
				updateModelHandle.updateObject(meta,plainValue,modelHandle,this.editorFactory);
			}else{
				updateModelHandle.updateMergedObject(meta,plainValue,modelHandle,this.editorFactory);
			}			
		},
		updateModelHandle: function(meta,plainValue,modelHandle) {
			updateModelHandle.updateArray(meta,plainValue,modelHandle,this.editorFactory, lang.hitch(this,"updateObject"));
		}
	})
});
