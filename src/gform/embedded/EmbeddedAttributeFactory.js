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

//			var validTypes = attribute.validTypes;
//
//			if (validTypes != null && validTypes.length > 1) {
//				var validTypeOptions = array.map(attribute.validTypes,
//						function(validType) {
//							return {
//								value : validType.code,
//								label : validType.label
//							};
//						});
//				validTypeOptions.push({
//					label : "null",
//					value : "null"
//				});
//				var initialType = validTypeOptions[0].value
//				var panelModel = new Stateful({
//					title : "",// attribute.code,
//					validTypes : validTypeOptions,
//					type : initialType
//				});
//				panelWidget = new GroupPanelWidget({
//					target : panelModel
//
//				});
//
//				var typeStack = new StackContainer();
//				var typeToGroup = {};
//				array.forEach(attribute.validTypes, function(type) {
//					var editor = new app.Editor();
//					editor.set("meta", type);
//					editor.set("modelHandle", model);
//					typeStack.addChild(editor);
//					typeToGroup[type.code] = editor;
//				}, this);
//				var nullWidget = new AttributeListWidget();
//				typeStack.addChild(nullWidget);
//				typeToGroup["null"] = nullWidget;
//				panelModel.watch("type", function() {
//					var type = panelModel.get("type");
//					if (type == "null") {
//						modelHandle.set(attribute.code, null);
//						model.set(attribute.type_property, null);
//						typeStack.selectChild(typeToGroup[type]);
//					} else {
//						modelHandle.set(attribute.code, model);
//						model.set(attribute.type_property, type);
//						typeStack.selectChild(typeToGroup[type]);
//					}
//				});
//				panelWidget.addChild(typeStack);
//				panelModel.set("type", validTypeOptions[0].value);
//			} else {
//				model.set(attribute.type.type_property, attribute.type.code)
//				var panelModel = new dojo.Stateful();
//				panelModel.set("empty", false);
//				panelModel.set("title", "");
//				panelModel.watch("empty", function(e) {
//					if (panelModel.get("empty")) {
//						modelHandle.set(attribute.code, null);
//					} else {
//						modelHandle.set(attribute.code, model);
//					}
//				});
//				editor = new app.Editor();
//				editor.set("modelHandle", model);
//				editor.set("meta", attribute.type);
//				panelWidget = editor;
//			}
			
			if (attribute.validTypes && attribute.validTypes.length>1) {
				panelWidget = new GroupPanelWidget({
					"modelHandle":modelHandle,
					"meta":attribute
				});
			}else{
				panelWidget = new SingleTypePanelWidget({
					"modelHandle":modelHandle,
					"meta":attribute
				});
			}	

			return panelWidget;

		}
	})
});
