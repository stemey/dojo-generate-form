define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"../patch/StatefulArray",
	"./MetaModel",
	"./enhanceArray"
], function (lang, declare, StatefulArray, MetaModel, enhanceArray) {
	// module: 
	//		gform/model/SingleObject

	return declare([MetaModel], {
		// summary:
		//		rovides access to sibling attributes of modelHandle.
		value: null,
		elementFactory: null,
		constructor: function () {
			this.value = new StatefulArray([]);
			this._setupIndexes();
		},
		push: function (value) {
			this.value.push(this.elementFactory(value));
		},
		getModelByIndex: function (idx) {
			return this.value[idx];
		},
		update: function (/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			enhanceArray(this);

			if (plainValue == null) {
				this.value.splice(0, this.value.length);
				this.set("oldValue", []);
			} else if (typeof plainValue == "undefined") {
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
						this.resetMeta(model);
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
		_onArrayChanged: function () {
			var i = 0;
			this.value.forEach(function (model) {
				model.set("index", i++);
				model.parent = this;
			}, this);
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
