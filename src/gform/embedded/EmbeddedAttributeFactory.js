define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupPanelWidget",//
"./SingleTypePanelWidget",//
"dijit/layout/StackContainer",//
"dojo/Stateful",//
"dijit/TitlePane"//

], function(array, lang, declare, at, GroupPanelWidget, SingleTypePanelWidget,
		StackContainer,  Stateful, TitlePane) {

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

			var model = modelHandle.get(attribute.code);
			if (!model) {
				model = new Stateful();
				modelHandle.set(attribute.code, model);
			} else if (model.declaredClass
					&& model.declaredClass == "dojo.Stateful") {

			} else {
				model = new Stateful(model);
				modelHandle.set(attribute.code, model);
			}

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

		}
	})
});
