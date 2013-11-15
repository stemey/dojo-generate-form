define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/json",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupPanelWidget",//
"./SingleTypePanelWidget",//
"../model/SingleObject",//
"dijit/layout/StackContainer",//
"dojo/Stateful",//
"dijit/TitlePane",//
"../model/updateModelHandle",//
"dojo/text!../schema/embeddedAttributeProperties.json",//
"dojo/text!./embeddedExample.json",
"dojo/text!./embeddedInstanceExample.json"
], function(array, lang, json,declare, at, GroupPanelWidget, SingleTypePanelWidget, SingleObject,
		StackContainer,  Stateful, TitlePane,updateModelHandle,embeddedAttributeProperties, embeddedExample, embeddedInstanceExample) {
// module: 
//		gform/embedded/EmbeddedAttributeFactory
	return declare([],{
		id: "object",
		// summary:
		//		This AttributeFactory create the widget for single embedded attributes.
		handles : function(attribute, modelHandle) {
			return attribute.type=="object";
		},
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create : function(attribute, modelHandle, ctx) {
			panelWidget = new SingleTypePanelWidget({
				"modelHandle":modelHandle,
				"meta":attribute,
				editorFactory:this.editorFactory
			});
			return panelWidget;

		},
		createModel: function(schema,plainValue) {
			var model = this.editorFactory.createGroupModel(schema.group, plainValue);
			return model;
		}
		
	})
});
