define([
	"../model/SelectModel",
	"dojo/_base/declare",
	"dojox/mvc/at",
	"dojo/_base/lang",
	"./Select",
	"./createOptions",
	"./createStore",
	"./nullablePrimitiveConverter",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"

], function (SelectModel, declare, at, lang, Select, createOptions, createStore, nullablePrimitiveConverter, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {

		handles: function (attribute) {
			var values = attribute.values;
			var store = attribute.store;
			return !attribute.array && (( values != null && values.length > 0 ) || (store != null && store.url > ''));
		},

		create: function (attribute, modelHandle) {

			var valueBinding = at(modelHandle, "value").transform(
				nullablePrimitiveConverter);

			var select = new Select(lang.mixin({
				"value": valueBinding,
				options: at(modelHandle, "options"),
				maxHeight: -1
			}, createStore(attribute, modelHandle)));

			return select;
		},
		createModel: function (meta, plainValue) {
			var validators = this.editorFactory.getModelValidators(meta);
			var options = createOptions(meta, true);
			var model = new SelectModel({options: options, store: meta.store != "undefined",validators: validators, required: meta.required === true});
			model.update(plainValue);
			return model;
		}
	});

});
