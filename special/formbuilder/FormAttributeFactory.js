define(
	[
		"dojo/_base/declare",
		"dojo/aspect",
		"./GroupTransformer",
		"../../embedded/EmbeddedAttributeFactory"
	],
	function (declare, aspect, GroupTransformer, EmbeddedAttributeFactory) {

		return declare([EmbeddedAttributeFactory],
			{
				id: "form",
				createModel: function (schema) {
					var validators = this.editorFactory.getModelValidators(schema);
					var model = this.editorFactory.createGroupModel(schema.group);
					// marker to find the parent form
					model.form = true;
					model.transformer = new GroupTransformer();
					model.attributesSelectModel = [];
					function initialize() {
						model.set("attributesSelectModel", model.getModelByPath("attributes").getPlainValue().map(function (attribute) {
							var option = {};
							option.value = attribute.code;
							option.label = (attribute.label || attribute.code);
							return option;
						}));
					}
					function update() {
						if (model.initialized) {
							initialize();
						}
					}


					aspect.before(model, "init", initialize);
					aspect.after(model.getModelByPath("attributes"), "onChange", update);
					model.validators = validators;
					model.required = schema.required === true;
					if ("visitThis" in model) {
						model.visitThis = true;
					}
					return model;
				}
			});
	});
