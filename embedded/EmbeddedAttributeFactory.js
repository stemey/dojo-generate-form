define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/json",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupPanelWidget",//
"./SingleTypePanelWidget",//
"dijit/layout/StackContainer",//
"dojo/Stateful",//
"dijit/TitlePane",//
"../model/updateModelHandle",//
"dojo/text!../schema/embeddedAttributeProperties.json",//
"dojo/text!./embeddedExample.json",
"dojo/text!./embeddedInstanceExample.json"
], function(array, lang, json,declare, at, GroupPanelWidget, SingleTypePanelWidget,
		StackContainer,  Stateful, TitlePane,updateModelHandle,embeddedAttributeProperties, embeddedExample, embeddedInstanceExample) {
// module: 
//		gform/embedded/EmbeddedAttributeFactory
	return declare("app.EmbeddedGroupFactory", [],{
		// summary:
		//		This AttributeFactory create the widget for single embedded attributes.
		handles : function(attribute, modelHandle) {
			return attribute != null
					&& attribute.validTypes
					&& !attribute.array;
		},
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create : function(attribute, modelHandle) {


			var panelWidget;

			
			if (attribute.validTypes && attribute.validTypes.length>1) {
				panelWidget = new GroupPanelWidget({
					"modelHandle":modelHandle,
					"meta":attribute,
					nullable: attribute.required!=true,
					editorFactory:this.editorFactory
				});
			}else{
				panelWidget = new SingleTypePanelWidget({
					"modelHandle":modelHandle,
					"meta":attribute,
					editorFactory:this.editorFactory
				});
			}	

			return panelWidget;

		},
		updateModelHandle: function(meta,plainValue,modelHandle) {
			if (meta.validTypes.length==1) {
				updateModelHandle.updateObject(meta,plainValue,modelHandle,this.editorFactory);
			}else{
				updateModelHandle.updatePolyObject(meta,plainValue,modelHandle,this.editorFactory);
			}
		},
		getSchema: function() {
			var schema= dojo.fromJson(embeddedAttributeProperties);
			schema.id="embedded";
			schema.description="This attibute creates a subform for complex properties. It also handles complex arrays. The complex property is described by a group. The groupType can be left out. There may be more than one group. If so there will be a drop down to chhose the group. The value of the group is saved in the property whose name is defined by the schema property 'type_property'" ;
			schema.example=embeddedExample;
			schema.instanceExample=embeddedInstanceExample;
			return schema;
		}
		
	})
});
