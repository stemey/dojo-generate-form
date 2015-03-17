define([
    "dojo/_base/declare",
    "../converter/anyToTextConverter",
    "./TextareaAttributeFactory",
	"../model/PrimitiveModel"
], function (declare, anyToTextConverter, TextareaAttributeFactory, PrimitiveModel) {

    return declare("AnyTextAreaAttributeFactory", [TextareaAttributeFactory], {
        id: "anyTextArea",
        handles: function (attribute) {
            return attribute.type === "any";
        },
		createModel: function (meta) {
			var validators = this.editorFactory.getModelValidators(meta);
			var model = new PrimitiveModel({
				validators: validators,
				required: meta.required === true,
				schema: meta
			});
			return model;
		},
		getConverter: function (attribute, ctx) {
            if (attribute.converter) {
                return this.editorFactory.getConverter(attribute, ctx);
            } else {
                return anyToTextConverter;
            }

        }
    });

});
