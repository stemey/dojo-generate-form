define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./ArrayModel"
], function (lang, declare, ArrayModel) {
	// module: 
	//		gform/model/SingleObject

	return declare([ArrayModel], {
		keyProperty: "key",
		update: function (/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute

			var arrayValue = [];
			for (var key in plainValue) {
				var element = {};
				lang.mixin(element, plainValue[key]);
				element[this.keyProperty] = key;
				arrayValue.push(element);
			}
			this.inherited(arguments, [arrayValue]);
			this.set("oldValue", plainValue);
		},
		getModelByKey: function (key) {
			var found = null;
			this.value.forEach(function (model) {
				if (model.getPlainValue()[this.keyProperty] === key) {
					found = model;
				}
			}, this);
			return found;
		},
		getPlainValue: function () {
			var plainValue = {};
			this.value.forEach(function (model) {
				var value = model.getPlainValue();
				var key = value[this.keyProperty];
				delete value[this.keyProperty];
				plainValue[key] = value;
			}, this);
			return plainValue;
		},
		put: function (key, value) {
			var element = {};
			lang.mixin(element, value);
			element[this.keyProperty] = key;
			this.push(element);
		},
		visit: function (cb, parentIdx) {
			var me = this;
			cb(this, function () {
				me.value.forEach(function (model) {
					var idx = model.getPlainValue()[me.keyProperty];
					model.visit(cb, idx);
				});
			}, parentIdx);
		},
		_getModelByPath: function (idx, path) {
			return this.getModelByKey(idx).getModelByPath(path);
		}
	});
});