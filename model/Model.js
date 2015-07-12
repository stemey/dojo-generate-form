define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/Stateful",
	"dojo/i18n!dijit/form/nls/validate",
	"dojo/i18n!../nls/messages"
], function (lang, declare, Stateful, dijitNls, messages) {
	// module:
	//		gform/model/Model

	var emptyCascade = function () {
	};

	var MESSAGE_PATTERN = /^\{(.*)\}$/;

	return declare("gform.model.Model", [Stateful], {
		// summary:
		//		Provides access to sibling attributes of modelHandle.

		/**
		 * init alredy called?
		 */
		initialized: false,

		disabled: false,

		// schema:,
		//		the schema of this model
		schema: null,

		transformer: null,

		// emptyCacade: function
		//		a no-op function for not cascading visits.
		emptyCascade: emptyCascade,

		// parent: gform/model/Model
		//		the parent model
		parent: null,

		// alwaysUseInvalidMessage; boolean
		//		should be true if the dijit is doing live validation and using the invalid message. Therefore we should always use the general invalid message as  well.
		alwaysUseInvalidMessage: false,

		// touched: boolean
		//		once the user has edited this value the value should be true.

		touched: false,

		// state: string
		//		the state may be one of "", "Incomplete" or "Error"
		state: "",

		// errorCount: int
		//		the number of errors in this property and its children
		errorCount: 0,

		// ownErrorCount: int
		//		number of errors on this property. Always smaller or euqal to errorCount.
		ownErrorCount: 0,

		// incompelteCount: int
		//		number of incomplete properties
		incompleteCount: 0,

		// changedCount: int
		//		number of changed properties
		changedCount: 0,

		// oldErrors: gform/validate/Error
		//		the old errors. Including children. Used to check if errors changed.
		oldErrors: [],

		// validateOnChange: boolean
		//		if true changes to the value will be validated immediately
		validateOnChange: true,

		// bubble: boolean
		//		if true changes to value or state will bubble by calling onChange on the parent.
		bubble: true,
		constructor: function (kwArgs) {
			this.messages = this.messages || {};
			if (kwArgs && kwArgs.meta) {
				this.messages.missingMessage = kwArgs.meta.missingMessage;
				this.messages.invalidMessage = kwArgs.meta.invalidMessage;
				this.schema = kwArgs.meta;
			}
			this.watch("state", lang.hitch(this, "_onChangeState"));
			this.watch("value", lang.hitch(this, "_onChangeState"));
			this.watch("touched", lang.hitch(this, "_onChangeState"));
			this.watch("oldValue", lang.hitch(this, "_onChangeState"));
			if (this.schema) {
				this.set("disabled", this.schema.disabled);
			}
			this.watch("schema", function () {
				this.set("disabled", this.schema.disabled);
			});
		},
		getPath: function () {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			return this.parent ? this.parent.getChildPath(this) : "";

		},
		getChildPath: function (child) {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			var index = this.getChildIndex(child);
			if (this.parent) {
				var parentIndex = this.parent.getChildPath(this);
				if (parentIndex) {
					return parentIndex + "." + index;
				} else {
					return index;
				}
			} else {
				return index;
			}

		},
		getParent: function (attributeCode) {
			// summary:
			//		get value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			var model = this.parent.getModelByPath(attributeCode);
			if (model === null) {
				return null;
			} else {
				return model.getPlainValue();
			}
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
			return this.parent.watchPath(attributeCode, watchCallback);
		},
		_onChangeState: function (prop, old, nu) {
			if (this.bubble && old !== nu) {
				this.onChange(prop !== "state" && prop !== "oldValue");
			}
		},
		hasChanged: function () {
			return this.changedCount > 0;
		},
		onChange: function (validate, source) {
			if (validate !== false && this.validateOnChange) {
				this.validate();
			}
			this.computeProperties();
			if (this.bubble) {
				if (this.parent) {
					this.parent.onChange(validate, source || this);
				}
			} else {
				this.wouldHaveBubbled = true;
			}

		},
		_execute: function (cb, bubble) {
			var oldBubble = this.bubble;
			this.wouldHaveBubbled = false;
			this.bubble = false;
			try {
				cb.call(this);
			} finally {
				if (this.wouldHaveBubbled && this.parent && bubble) {
					this.parent.onChange();
				}
				this.wouldHaveBubbled = false;
				this.bubble = oldBubble;
			}
		},
		computeProperties: function () {
			var errorCount = 0;
			var incompleteCount = 0;
			var changedCount = 0;
			var ownErrorCount = 0;
			var me = this;
			// only visiting the immediate children
			this.visit(function (model, cascade) {
				if (model === me) {
					if (cascade) {
						cascade();
					}
				} else {
					errorCount += model.errorCount;
					//ownErrorCount += model.ownErrorCount;
					incompleteCount += model.incompleteCount;
					changedCount += model.changedCount;
				}
			});
			if (this.state === "Error") errorCount++;
			if (this.state === "Incomplete") incompleteCount++;
			if (this.oldErrors.length > 0) ownErrorCount++;
			if (changedCount === 0 && this.calculateChanged()) {
				changedCount = 1;
			}
			this.set("incompleteCount", incompleteCount);
			this.set("ownErrorCount", ownErrorCount);
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
		resetMetaRecursively: function (bubble) {
			this.visit(function (model, cascade) {
				if (cascade) {
					cascade();
				}
				model.resetMeta(false);
				if (bubble) {
					model._execute(function () {
						model.onChange(false);
					}, false);
				}
			});
			//this.resetMeta(false);

		},
		removeIndicators: function () {
			this.visit(function (model, cascade) {
				if (cascade) {
					cascade();
				}
				model._execute(function () {
					model.resetMeta(false);
					model.set("oldValue", model.getPlainValue());
					model.onChange(false);
				}, false);
			});
		},
		reset: function () {
			// summary:
			//		reset value and state.

			// remove errors
			this._execute(function () {
				this.visit(function (model, cascade, idx) {
					if (cascade && (model.get("changedCount") > 0 || model.get("errorCount") > 0)) {
						cascade();
					}
					model.resetMeta(false);
				});
			}, false);
			this.update(this.oldValue, true, false);
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
				var idx = 0;
				var model = this;
				while (path[idx++] === "") {
					model = model.parent;
				}
				if (model === this) {
					return this._getModelByPath(path[0], path.slice(1));
				} else {
					return model.getModelByPath(path.slice(idx - 1));
				}
			}

		},
		resetErrors: function () {
			// summary:
			//		reset meta data. does not cascade.
			this._execute(function () {
				this.set("state", "");
				this.computeProperties();
			}, false);
			this.onChange(false);
		},
		resetMeta: function (bubble) {
			// summary:
			//		reset meta data. does not cascade.
			this._execute(function () {
				this.set("state", "");
				this.set("message", "");
				this.set("touched", false);
				//this.set("oldValue", this.getPlainValue());
			}, bubble !== false);
		},
		hasChildrenErrors: function () {
			return this.errorCount > this.ownErrorCount;
		},
		isEmpty: function () {
			return false;
		},
		validateRecursively: function (force) {
			var me = this;
			this.visit(function (model, cascade) {
				model._execute(function () {
					if (!model.isEmpty()) {
						cascade();
					}
					// call on change because children may have changed
					//model.onChange(false);
					model.validate(force);
				}, false);
				model.onChange(false);
			});
		},
		forceChangeNotification: function () {
			var me = this;
			this.visit(function (model, cascade) {
				if (!model.isEmpty()) {
					if (cascade) cascade();
				}
				var oldBubble = model.bubble;
				model._execute(function () {
					model.onChange(false);
				}, false);
			});
		},
		onTouch: function () {
			this.set("touched", true);
		},
		calculateChanged: function () {
			if (typeof this.oldValue === "undefined") {
				return false;
			} else {
				return this.value !== this.oldValue;
			}
		},
		validate: function (force) {
			if (this.isEmpty()) {
				if (this.required) {
					if (force === true || this.touched || this.hasChanged()) {
						this.set("state", "Error");
						this.set("message", this.getMissingMessage());

					} else {
						this.set("state", "Incomplete");
						this.set("message", this.getMissingMessage());
					}
					return;

				} else {
					//this.set("state", "");
					//this.set("message", "");
					return;
				}
			} else {
				if (this.state === "Incomplete" || this.state === "Error") {
					this.set("state", "");
					this.message = "";
				}
			}
			this._execute(function () {
				var errors = [];

				if (this._validate) {
					errors = errors.concat(this._validate());
				}
				if (this.validators) {
					this.validators.forEach(function (validator) {
						if (typeof validator === "function") {
							errors = errors.concat(validator(this, force));
						} else {
							errors = errors.concat(validator.validate(this, force));
						}
					}, this);
				}
				var changes = this._getErrorChanges(errors, this.oldErrors);
				// we might have to readd the errors in subproperties, because the value was changed.
				errors.forEach(function (error) {
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
		watchPath: function (path, watcher, name) {
			if (name) {
				return this.getModelByPath(path).watch(name, watcher);
			} else {
				return this.getModelByPath(path).watch(watcher);
			}
		},
		getMessage: function (message, internal) {
			// summary:
			//		get the human readable message. If the parameter is enclosed in curly braces then the message
			// 		will be served from this model's messages property or the message bundle.  Otherwise it will be returned as is.


			if (internal && this.messages.invalidMessage) {
				return this.messages.invalidMessage;
			} else if (!message) {
				return this.getMessageForKey("invalidMessage");
			} else {
				return message;
			}

		},
		getMessageForKey: function (key) {
			// summary:
			//		get message for error key. either taken from the messages in schema or from the general message bundle.
			// key: string
			//		id of message
			return this.messages[key] || dijitNls[key];
		},
		isRequired: function () {
			return this.required;
		},
		getMissingMessage: function () {
			// summary:
			//		the missing message is either specially dfined in the schema or the default from resource bundle is used.
			return this.messages.missingMessage || dijitNls.missingMessage;
		},
		initDefault: function () {

		},
		addError: function (path, message) {
			// summary:
			//		add an error the model at path
			// path: string
			//		identifies the model
			// message: string
			//		the message
			var model = this.getModelByPath(path);
			model._addError(message, !path || path.length === 0);
		},
		_addError: function (message, internal) {
			this.set("state", "Error");
			this.set("message", this.getMessage(message, internal));
		},
		removeError: function (path, message) {
			// summary:
			//		remove an error from the model on the path
			// path: string
			//		the path to the model
			// message: string
			//		to identify the message. If a different message is present then it won't be removed.
			var model = this.getModelByPath(path);
			if (model) {
				model._removeError(message);
			}
		},
		_removeError: function (message) {
			if (this.get("message") === this.getMessage(message)) {
				this.set("state", "");
				this.set("message", "");
			}
		},
		transformIn: function (value) {
			if (this.transformer) {
				return this.transformer["in"](value);
			} else {
				return value;
			}
		},
		transformOut: function (value) {
			if (this.transformer) {
				return this.transformer.out(value, this.schema);
			} else {
				return value;
			}
		},
		getChangeMessage: function () {
			var message;
			if (this.oldValue === null) {
				message = this._getWasNullMessage();
			} else {
				message = lang.replace(messages.oldValueChanged, {oldValue: JSON.stringify(this.oldValue, true)});
			}
			return message;

		},
		_getWasNullMessage: function () {
			return messages.oldValueWasNull;
		},
		_getWasNotNullMessage: function () {
			return messages.oldValueWasNotNull;
		},
		_getEmbeddedChanges: function () {
			return lang.replace(messages.embeddedChanges, {changedCount: this.changedCount});
		},
		init: function () {
			this.initialized = true;
		}
	});
});
