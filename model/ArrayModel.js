define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"../patch/StatefulArray",
	"./Model"
], function (lang, declare, StatefulArray, Model) {
	// module: 
	//		gform/model/SingleObject

	return declare([Model], {
		// summary:
		//		rovides access to sibling attributes of modelHandle.
		value: null,
		elementFactory: null,
		constructor: function () {
			this.value = new StatefulArray([]);
			this._setupIndexes();
		},
		push: function (value) {
			var model = this.elementFactory(value);
			this.value.push(model);
			return model;
		},
		length: function () {
			return this.value.length;
		},
		getModelByIndex: function (idx) {
			var value = this.value[idx];
			if (typeof value === "undefined") {
				value = null;
			}
			return value;

		},
		update: function (/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute

			if (plainValue == null) {
				this.value.splice(0, this.value.length);
				this.set("oldValue", []);
			} else if (typeof plainValue === "undefined") {
				this.value.splice(0, this.value.length);
				this.set("oldValue", []);
			} else if (Array.isArray(plainValue)) {
				var removeCount = this.value.length - plainValue.length;
				if (removeCount > 0) {
					this.value.splice(0, removeCount);
				}
				plainValue.forEach(function (element, i) {
					var model = this.value[i];
					if (model == null) {
						model = this.elementFactory(element);
						this.value.push(model);
					} else {
						model.resetMeta();
						model.update(element);
					}
				}, this);
				this.set("oldValue", this.getPlainValue());
			}
		},
		iterateChildren: function (cb) {
			if (!this.value) {
				return;
			}
			this.value.forEach(function (model, index) {
				cb.call(this, model);
			}, this);
		},
		forEach: function (cb, ctx) {
			this.value.forEach(cb, ctx);
		},
		_onArrayChanged: function () {
			var i = 0;
			this.value.forEach(function (model) {
				model.set("index", i++);
				model.parent = this;
			}, this);
			this.onChange();
		},
		_setupIndexes: function () {
			this.value.watch(lang.hitch(this, "_onArrayChanged"));
			this._onArrayChanged();
		},
		visit: function (cb, parentIdx) {
			var me = this;
			cb(this, function () {
				me.value.forEach(function (model, idx) {
					model.visit(cb, idx);
				});
			}, parentIdx);
		},
		removeChild: function (child) {
			var index = this.value.indexOf(child);
			this.value.splice(index, 1);
		},
		getPlainValue: function () {
			var plainValue = [];
			this.value.forEach(function (model) {
				plainValue.push(model.getPlainValue());
			}, this);
			return plainValue;
		},
		_getModelByPath: function (idx, path) {
			var model = this.getModelByIndex(parseInt(idx));
			if (model == null) {
				return null;
			} else {
				return model.getModelByPath(path);
			}
		}
	});
})
;
