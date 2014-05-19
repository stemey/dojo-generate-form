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
				"groups": attribute.groups,
				nullable: attribute.required !== true,
				editorFactory: this.editorFactory,
                ctx:ctx
			});
			return panelWidget;

		},
		createModel: function (schema, plainValue) {
			var groups = [];
            var validators = this.editorFactory.getModelValidators(schema);
			schema.groups.forEach(function (group) {
				var model = this.editorFactory.createGroupModel(group);
				model.update({});
				groups.push(model);
			}, this);
			var model = MultiObject.create({groups: groups, schema: schema});
            model.validators=validators;
			model.update(plainValue);
			return model;
		}

	});
});
