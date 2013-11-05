define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/json",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupPanelWidget",//
"../model/MultiObject",//
"dijit/layout/StackContainer",//
"dojo/Stateful",//
"dijit/TitlePane",//
"../model/updateModelHandle",//
"dojo/text!../schema/embeddedAttributeProperties.json",//
"dojo/text!./embeddedExample.json",
"dojo/text!./embeddedInstanceExample.json"
], function(array, lang, json,declare, at, GroupPanelWidget, MultiObject,
		StackContainer,  Stateful, TitlePane,updateModelHandle,embeddedAttributeProperties, embeddedExample, embeddedInstanceExample) {
// module: 
//		gform/embedded/MultiEmbeddedAttributeFactory
	return declare([],{
		id: "multi-object",
		// summary:
		//		This AttributeFactory create the widget for single embedded attributes.
		handles : function(attribute, modelHandle) {
			return attribute.type=="multi-object";
		},
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create : function(attribute, modelHandle) {
			panelWidget = new GroupPanelWidget({
				"modelHandle":modelHandle,
				"groups":attribute.groups,
				//"typeProperty":attribute.typeProperty,
				editorFactory:this.editorFactory
			});
			return panelWidget;

		},
		createModel: function(schema,plainValue) {
			var groups = [];
			schema.groups.forEach(function(group) {
				var model = this.editorFactory.createGroupModel(group);
				model.update({});
				groups.push(model);
			}, this);
			var model = new MultiObject({groups:groups, typeProperty:schema.typeProperty});
			model.update(plainValue);
			return model;
		}
		
	})
});
