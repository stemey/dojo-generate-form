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
"../updateModelHandle",//
"dojo/text!../schema/embeddedAttributeProperties.json"
], function(array, lang, json,declare, at, GroupPanelWidget, SingleTypePanelWidget,
		StackContainer,  Stateful, TitlePane,updateModelHandle,embeddedAttributeProperties) {

	return declare("app.EmbeddedGroupFactory", [],{
		handles : function(attribute, modelHandle) {
			// check if the attribute is complex.
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
			return schema;
		}
		
	})
});
