define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/Stateful",
	"./equals"
], function (lang, declare, Stateful, equals) {
	// module: 
	//		gform/Resolver

	var emptyCascade = function () {
	};

	return declare([Stateful], {
		// summary:
		//		Provides access to sibling attributes of modelHandle.

		// schema:,
		//		the schema of this model
		schema: null,

		emptyCascade: emptyCascade,

		// parent:,
		//		the parent model
		parent: null,
		touched: false,
		state: "",
		errorCount: 0,
		incompleteCount: 0,
		changedCount: 0,
		oldErrors: [],
		validateOnChange: true,
		editorFactory: null,
		tmp: {},
		constructor: function () {
			this.watch("state", lang.hitch(this, "_onChangeState"));
			this.watch("value", lang.hitch(this, "_onChangeState"));
		},
		getPath: function (modelHandle) {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			return "";
		},
		getParent: function (attributeCode) {
			// summary:
			//		get value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			return this.parent.getModelByKey(attributeCode).getPlainValue();
		},
		watchParent: function (attributeCode, watchCallback) {
			// summary:
			//		watch value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			// watchCallback: function
			//		callback
			// returns: Object
			//		WatchHandle and sibling a PrimitiveModel

			// TODO only works for parent being an object
			return this.parent.getModelByKey(attributeCode).watch("value", watchCallback);
		},
		createMeta: function (schema) {
			// summary:
			//		create a meta object
			// returns: dojo/Stateful
			var meta = this.editorFactory.createMeta(schema);
			meta.set("tmp", new Stateful());
			meta.parent = this;
			return meta;
		},
		bubble: true,
		_onChangeState: function (prop, old, nu) {
			if (old !== nu) {
				this.onChange(prop !== "state");
			}
		},
		hasChanged: function () {
			return typeof this.oldValue !== "undefined" && this.getPlainValue() !== this.oldValue && !equals(this.getPlainValue(), this.oldValue);
		},
		onChange: function (validate) {
			if (validate !== false && this.validateOnChange) {
				this.validate();
			}
			this.computeProperties();
			if (this.bubble) {
				if (this.parent) {
					this.parent.onChange(validate);
				}
			}
		},
		_execute: function (cb, bubble) {
			var oldBubble = this.bubble;
			this.bubble = bubble === true;
			try {
				cb.call(this);
			} finally {
				this.bubble = oldBubble;
			}
		},
		computeProperties: function () {
			var errorCount = 0;
			var incompleteCount = 0;
			var changedCount = 0;
			if (this.iterateChildren) {
				this.iterateChildren(function (model) {
					errorCount += model.errorCount;
					incompleteCount += model.incompleteCount;
					changedCount += model.changedCount;
				});
			}
			if (this.state === "Error") errorCount++;
			if (this.state === "Incomplete") incompleteCount++;
			if (this.hasChanged() && changedCount === 0) {
				changedCount = 1;
			}
			this.set("incompleteCount", incompleteCount);
			this.set("changedCount", changedCount);
			this.set("errorCount", errorCount);
		},
		remove: function () {
			if (this.parent && this.parent.removeChild) {
				this.parent.removeChild(this);
			}
		},
		visit: function (cb, idx) {
			cb(this, idx);
		},
		resetMetaRecursively: function () {
			this.visit(function (model, cascade) {
				model.resetMeta();
				cascade();
				model.computeProperties();
			});
		},
		reset: function () {
			// summary:
			//		reset value and state.
			this.visit(function (model, cascade, idx) {
				model.resetMeta();
				cascade();
			});
			this.update(this.oldValue, false);
		},
		getModelByPath: function (path) {
			if (path === "") {
				return this;
			}
			if (!Array.isArray(path)) {
				path = path.split(".");
			}
			if (path.length === 0) {
				return this;
			} else {
				return this._getModelByPath(path[0], path.slice(1));
			}

		},
		resetMeta: function () {
			// summary:
			//		reset meta data. does not cascade.
			this.set("state", "");
			this.set("message", "");
		},
		hasChildrenErrors: function () {
			if (this.get("errorCount") === 0) {
				return false;
			} else if (this.oldErrors.length !== this.get("errorCount")) {
				return true;
			} else {
				return this.oldErrors.some(function (error) {
					var model = this.getModelByPath(error.path);
					return model.get("message") !== error.message;
				}, this);
			}
		},
		isEmpty: function () {
			return false;
		},
		validateRecursively: function (force) {
			this.visit(function (model, cascade) {
				cascade();
				model.validate(force);
			});
		},
		onTouch: function () {
			this.touched = true;
		},
		validate: function (force) {
			if (this.isEmpty()) {
				if (this.required) {
					if (force===true || this.touched || this.hasChanged()) {
						this.set("state", "Error");
						this.set("message", "value is missing");

					} else {
						this.set("state", "Incomplete");
						this.set("message", "value is missing");
					}
					return;

				} else {
					return;
				}
			}
			this._execute(function () {
				var errors = [];

				if (this._validate) {
					errors = errors.concat(this._validate());
				}
				if (this.validators) {
					this.validators.forEach(function (validator) {
						errors = errors.concat(validator(this));
					}, this);
				}
				var changes = this._getErrorChanges(errors, this.oldErrors);
				changes.a.forEach(function (error) {
					this.addError(error.path, error.message);
				}, this);
				changes.r.forEach(function (error) {
					this.removeError(error.path, error.message);
				}, this);
				this.oldErrors = errors;
			}, false);
		},
		_getErrorChanges: function (newErrors, oldErrors) {
			var errorsToRemove = oldErrors.filter(function (oe) {
				return !newErrors.some(function (e) {
					return e.path === oe.path;
				});
			});
			var errorsToAdd = newErrors.filter(function (e) {
				return !oldErrors.some(function (oe) {
					return e.path === oe.path;
				});
			}, this);
			return {a: errorsToAdd, r: errorsToRemove};
		},
		addError: function (path, message) {
			var model = this.getModelByPath(path);
			model.set("state", "Error");
			model.set("message", message);
		},
		removeError: function (path, message) {
			var model = this.getModelByPath(path);
			if (model.get("message") === message) {
				model.set("state", "");
				model.set("message", "");
			}
		}
	});
});
