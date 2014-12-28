define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./GroupPanelWidget",
	"../model/MultiObject"
], function (lang, declare, GroupPanelWidget, MultiObject) {
// module:
//		gform/embedded/MultiEmbeddedAttributeFactory
	return declare([], {
		id: "multi-object",
		// summary:
		//		This AttributeFactory create the widget for single embedded attributes.
		handles: function (attribute, modelHandle) {
			return attribute.type === "object" && attribute.groups;
		},
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create: function (attribute, modelHandle,ctx) {
			var panelWidget = new GroupPanelWidget({
				"modelHandle": modelHandle,
				"nullLabel":attribute.nullLabel,
				"groups": attribute.groups,
				nullable: attribute.required !== true,
				editorFactory: this.editorFactory,
                ctx:ctx
			});
			return panelWidget;

		},
		createModel: function (schema, plainValue) {
			//var groups = [];
            var validators = this.editorFactory.getModelValidators(schema);
			var model = MultiObject.create({schema: schema, editorFactory:this.editorFactory});
            model.validators=validators;
			model.update(plainValue);
			return model;
		}

	});
});
