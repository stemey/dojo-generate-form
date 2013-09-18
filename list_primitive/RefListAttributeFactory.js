define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./RefListWidget",//
"dojox/mvc/sync",//
"dojox/mvc/WidgetList",//
"./RepeatedAttributeWidget",//
"../widget/MvcDndSource",//
"../model/updateModelHandle",//
"../schema/meta",//
"../primitive/dijitHelper",//
"dijit/registry"
], function(array, lang, aspect, Editor, declare, at, StatefulArray, Stateful,
		EmbeddedListWidget, sync, WidgetList, RepeatedAttributeWidget , DndSource, updateModelHandle, metaHelper, dijitHelper, registry) {
// module: 
//		gform/list_primitive/RefListAttributeFactory

	return declare( [], {
		// summary:
		//		creates a list of ref attributes.
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
				return metaHelper.isType(attribute,"ref")
						&& attribute.array;
		},
		create : function(attribute, modelHandle, ctx) {
			if (modelHandle.value==null) {
				throw new "provide a default value";//modelHandle.value=new StatefulArray([]);
			}	
			var childAttribute ={};
			lang.mixin(childAttribute, attribute)
			childAttribute.array=false;
			childAttribute.targetCreatable=false;
			delete childAttribute.editor;
			
			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute : attribute,
				childAttribute : childAttribute,
				editorFactory:this.editorFactory,
				opener: ctx.opener
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
			if (attribute.reorderable !== false) {
				var copy = function(original) {
					var newMh=updateModelHandle.createMeta();
					newMh.value=original.value;
					newMh.oldValue=original.oldValue;
					return newMh;
				}
				aspect.after(widgetList, "startup", function() {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true, withHandles:true});
				});
			}
			select.addChild(widgetList);
			return select;

		},
		getSchema:function(){
			var schema={};
			schema["id"]="ref-list";
			var properties={};
			schema["description"]="This is a a list of Selects displaying the labels of referenced entities. The autocomplete functionality allows searching through possible entities to associate. It is based on 'dijit.form.FilteringSelect'. There are also buttons to edit the referenced entities or create a new entity in a separate editor. The location of the editor is defined by the opener in the parent editor's context.";
			schema["example"]=dojo.toJson({code:'friend',type:'ref', array:true, url:"/service/people", idProperty:"id",

 searchProperty: "name", schemaUrl:"/service/people?schema" },true);

			schema["instanceExample"]=dojo.toJson({refs: [{$ref: "/services/people/1"}]},true);
			schema.properties=properties;
			properties.type={type:"string",required:true,"enum":["ref"]};
			properties.url={type:"string",required:true,description:"the url of the restful resources assoicated with theis property."};
			properties.idProperty={type:"string",required:false,description:"the id property in the rest services json resources"};
			properties.searchProperty={type:"string",required:false,description:"the property displayed and matched against the user input."};
			properties.schemaUrl={type:"string",required:true,description:"the url to the schema of the referenced entity."};
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required",properties);
			properties["readOnly"]={ type : "boolean"};
			dijitHelper.addSchemaProperty("missingMessage",properties);
			dijitHelper.addSchemaProperty("promptMessage",properties);
			dijitHelper.addSchemaProperty("placeHolder",properties);
			dijitHelper.addSchemaProperty("invalidMessage",properties);
			properties.array={type:"boolean","enum":[true]};
			return schema;
		}
	})
});
