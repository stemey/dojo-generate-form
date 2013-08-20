define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"../widget/MvcDndSource",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"./TableWidgetList",//
"./RepeatedEmbeddedWidget",//
"../model/updateModelHandle",//
"./TableHeader",//
"./TableElementHeader",//
"./mergeAttributeDefinitions",//
"dojo/text!../schema/embeddedAttributeProperties.json",
"dojo/text!./embeddedExample.json",
"dojo/text!./embeddedInstanceExample.json"
], function(array, lang, aspect, Editor, declare, at, 
		StatefulArray, Stateful, DndSource, EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle,TableHeader,TableElementHeader,mergeAttributeDefinitions, embeddedAttributeProperties, embeddedExample, embeddedInstanceExample) {

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
				attribute:attribute,
				editorFactory: this.editorFactory
			});

				
			var tableHeader =new TableHeader();
			if (attribute.validTypes.length>1) {
				tableHeader.addChild(new TableElementHeader({label:attribute.type_property}));
				
			}


			array.forEach(combinedAttributes,function(attribute) {
				tableHeader.addChild(new TableElementHeader({label: attribute.label || attribute.code, description: attribute.description}));
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

			if (attribute.reorderable!==false) {
				var copy = function(original) {
					var newMh=updateModelHandle.createMeta();
					newMh.value=original.value;
					newMh.oldValue=original.oldValue;
					return newMh;
				}
				aspect.after(widgetList, "startup", function() {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true});
				});
			}


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
		},
		getSchema : function() {
			var schema = dojo.fromJson(embeddedAttributeProperties);
			schema.description="This attribute represents an array of objects. They are displayed in a table. validTypes describes the possible types/groups of objects. The table columns represent the union of all properties. Common properties appear only once. Proerty cells will be invisible if not applicable to the rows object";
			schema.example=embeddedExample;
			schema.instanceExample=embeddedInstanceExample;
			schema.properties.editor={type:"string","enum":["table"],required:true};
			return schema;
		}
	})
});
