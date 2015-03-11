define(
	[
		"dojo/_base/declare",
		"dojo/aspect",
		"./GroupTransformer",
		"../../list_embedded/RepeatedEmbeddedAttributeFactory",
		"../../model/ArrayModel"
	],
	function (declare, aspect, GroupTransformer, RepeatedEmbeddedAttributeFactory, ArrayModel) {

		return declare([RepeatedEmbeddedAttributeFactory],
			{
				id: "form-array",
				createModel: function (meta) {
					var validators = this.editorFactory.getModelValidators(meta);
					var model = new ArrayModel({schema: meta, validators: validators});
					var me = this;
					var ef = function (value) {
						var newElement = me.editorFactory.createGroupModel(meta.group);
						newElement.form = true;
						newElement.transformer = new GroupTransformer();

						newElement.attributesSelectModel = null;
						function initialize() {
							var attributesSelectModel = newElement.getModelByPath("attributes").getPlainValue().map(function (attribute) {
								var option = {};
								option.value = attribute.code;
								option.label = (attribute.label || attribute.code);
								return option;
							});
							newElement.set("attributesSelectModel", attributesSelectModel);
						}
						function update() {
							if (newElement.initialized) {
								initialize();
							}
						}

						// initialize select model when the main model is initialized
						aspect.before(model, "init", initialize);
						aspect.after(newElement.getModelByPath("attributes"), "onChange", update);

						if (value) {
							newElement.update(value,true,model.initialized);
						}
						return newElement;
					};
					model.elementFactory = ef;
					return model;
				}
			});
	});
