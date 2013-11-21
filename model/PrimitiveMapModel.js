define([ "dojo/_base/array", //
	"dojo/_base/lang",//
	"dojo/_base/declare",//
	"./ArrayModel",//
], function (array, lang, declare, ArrayModel) {
	// module: 
	//		gform/model/SingleObject

	return declare([ArrayModel], {
		keyProperty: "key",
		valueProperty: "value",
		update: function (/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute

			var arrayValue = [];
			for (var key in plainValue) {
				var element = {};
				element[this.valueProperty] = plainValue[key];
				element[this.keyProperty] = key;
				arrayValue.push(element);
			}
			this.inherited(arguments, [arrayValue]);
			this.set("oldValue", plainValue);
		},
		getModelByKey: function (key) {
			var found = null;
			this.value.forEach(function (model) {
				if (model.getPlainValue()[this.keyProperty] == key) {
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
				plainValue[key] = value[this.valueProperty];
			}, this);
			return plainValue;
		},
		put: function (key, value) {
			var element = {};
			element[this.keyProperty] = key;
			element[this.valueProperty] = value;
			this.push(element);
		},
		_getModelByPathPath: function (path) {
			throw new Error("not implemented yet");
		}
	});
});
