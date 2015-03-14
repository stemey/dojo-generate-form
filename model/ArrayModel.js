define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"../patch/StatefulArray",
	"./Model",
	"./equals"
], function (lang, declare, StatefulArray, Model, equals) {
	// module:
	//		gform/model/SingleObject

	return declare("gform.model.ArrayModel", [Model], {
		// summary:
		//		provides access to sibling attributes of modelHandle.
		value: null,
		elementFactory: null,
		constructor: function () {
			this.value = new StatefulArray([]);
			this._setupIndexes();
		},
		addNew: function () {
			var model = this.elementFactory();
			model.initDefault(false);
			this._push(model);
			return model;
		},
		_push: function (model) {
			model.set("parent", this);
			if (this.initialized) {
				model.init();
			}
			this.value.push(model);
		},
		push: function (value) {
			var model = this.elementFactory(value);
			//model.update(value, false, true);
			this._push(model);
			return model;
		},
		pop: function () {
			return this.value.pop();
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
		getChildIndex: function (child) {
			return this.value.indexOf(child);
		},
		initDefault: function (setOldValue) {
			if (this.schema.defaultValue) {
				this._execute(function () {
					this.resetMeta();
					this.update(this.schema.defaultValue, setOldValue);
				});
			}
		},
		calculateChanged: function () {
			if (!this.oldValue || this.oldValue.length !== this.value.length) {
				return true;
			} else {
				return this.oldValue.some(function (el, idx) {
					return !equals(el, this.getModelByIndex(idx).getPlainValue());
				}, this);
			}
		},
		update: function (/*Object*/plainValue, setOldValue, bubble) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			this._execute(function () {
				if (plainValue === null) {
					this.value.splice(0, this.value.length);
					if (setOldValue !== false) {
						this.set("oldValue", []);
					}
				} else if (typeof plainValue === "undefined") {
					this.value.splice(0, this.value.length);
					if (setOldValue !== false) {
						this.set("oldValue", []);
					}
				} else if (Array.isArray(plainValue)) {
					var removeCount = this.value.length - plainValue.length;
					if (removeCount > 0) {
						this.value.splice(0, removeCount);
					}
					plainValue.forEach(function (element, i) {
						var model = this.value[i];
						if (!model) {
							model = this.elementFactory(element);
							model.update(element, true, false);
							this._push(model);
						} else {
							model.resetMeta();
							model.update(element, setOldValue, false);
						}
					}, this);
					if (setOldValue !== false) {
						this.set("oldValue", this.getPlainValue());
					}
				}
				this.onChange();
			}, false);
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
				model.set("parent", this);
			}, this);
			if (this.bubble) {
				this.onChange();
			}
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
			if (model === null) {
				return null;
			} else {
				return model.getModelByPath(path);
			}
		},
		getChangeMessage: function() {
			return "";
		},
		init: function () {
			this.inherited(arguments);
			this.iterateChildren(function (child) {
				child.set("parent", this);
				child.init();
			});
		}
	});
})
;
