define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"../model/ArrayModel",//
"dojo/Stateful",//
"../widget/MvcDndSource",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"./TableWidgetList",//
"./RepeatedEmbeddedWidget",//
"../model/SingleObject",//
"./TableHeader",//
"./TableElementHeader",//
"./mergeAttributeDefinitions",//
"dojo/text!../schema/embeddedAttributeProperties.json",
"dojo/text!./embeddedExample.json",
"dojo/text!./embeddedInstanceExample.json"
], function(array, lang, aspect, Editor, declare, at, 
		ArrayModel, Stateful, DndSource, EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, SingleObject,TableHeader,TableElementHeader,mergeAttributeDefinitions, embeddedAttributeProperties, embeddedExample, embeddedInstanceExample) {

	return declare( [], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && attribute.type=="table-single-array";
		},
		
		create : function(attribute, modelHandle) {

			if (modelHandle.value==null) {
				throw new Error("modelHandle.value should be initialized here");
			}
			
			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute:attribute,
				editorFactory: this.editorFactory
			});

				
			var tableHeader =new TableHeader();

			var attributes = attribute.attributes;


			array.forEach(attributes,function(attribute) {
				tableHeader.addChild(new TableElementHeader({label: attribute.label || attribute.code, description: attribute.description}));
			},this);
			select.addChild(tableHeader);
			
			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta : attribute,
				combinedAttributes: attributes,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);

			var me = this;
			if (attribute.reorderable!==false) {
				var copy = function(original) {
					var value =original.getPlainValue();
					return this.modelHandle.push(value);
				}
				aspect.after(widgetList, "startup", function() {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true, withHandles: true});
				});
			}


			return select;

		},
		createModel: function(meta, value) {
			var me =this;
			var model = new ArrayModel();
			model.elementFactory = function(element) {
				var aModels={};
				meta.attributes.forEach(function(attribute) {
					aModels[attribute.code]= me.editorFactory.createAttributeModel(attribute);
				});
				var elModel =  new SingleObject({attributes: aModels});
				elModel.update(element);
				return elModel;
			}
			model.update(value);
			return model;
			
		}
	})
});
