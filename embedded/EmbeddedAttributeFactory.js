define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupPanelWidget",//
"./SingleTypePanelWidget",//
"dijit/layout/StackContainer",//
"dojo/Stateful",//
"dijit/TitlePane",//
"../getStateful"//

], function(array, lang, declare, at, GroupPanelWidget, SingleTypePanelWidget,
		StackContainer,  Stateful, TitlePane,getStateful) {

	return declare("app.EmbeddedGroupFactory", [],{
		handles : function(attribute, modelHandle) {
			// check if the attribute is complex.
			return attribute != null
					&& (attribute.type.attributes || attribute.validTypes)
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
		updateStatefulModel: function(plainValue,modelHandle) {
			if (plainValue==null) {
				modelHandle.set("value",null);
			}else{
				array.forEach(this.meta.validTypes.attributes,function(attribute) {
					var childHandle = modelHandle.value[attribute.code];
					if (!childHandle) {
						childHandle=new Stateful({});
						modelHandle.value[attribute.code]=childHandle;
					}
					this.editorFactory.getAttributeFactory(attribute).updateStatefulModel(plainValue[attribute.code],childHandle);
				},this);
			}
		}
	})
});
