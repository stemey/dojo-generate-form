define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"../model/PrimitiveModel"
], function (lang, declare, PrimitiveModel) {

	return declare([], {
		editorFactory: null,
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createModel: function (meta, plainValue) {
			var validators = this.editorFactory.getModelValidators(meta);
			var model = new PrimitiveModel({validators: validators, required: meta.required === true});
			model.update(plainValue);
			return model;
		}
	});

});
