define([
	'./createActions',
	'dijit/_WidgetBase',
	'dojo/aspect',
	'dojo/store/Memory',
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/Deferred",
	"dojo/when",
	"dojo/Stateful",
	"dojo/dom-class",
	"dojo/i18n!../nls/messages",
	"gform/schema/meta",
	"dijit/form/FilteringSelect"
], function (createActions, WidgetBase, aspect, Memory, declare, lang, Deferred, when, Stateful, domClass, messages, metaHelper) {
// module:
//		gform/controller/_CrudMixin

	return declare([Stateful, WidgetBase], {
		// summary:
		//		the _CrudMixin wraps an editor and a store. Methods for loading or creating entities from a store are provided.

		// state:
		//		maybe "loading", "edit", "create".
		state: "loading",

		selectButton:null,

		showSelectButton:false,

		// fallbackSchema:
		//		if loading the schema fails, then use this general schema
		fallbackSchema: null,

		schemaSelector: null,

		// plainValueFactory: function
		//		creates an instance of plainValue. parameter is the schema.
		plainValueFactory: null,

		actionFactory: null,

		// store:
		//		the store used to persist the entity.
		store: null,

		// editor:
		//		the editor
		editor: null,

		oldValue: null,
		typeProperty: null,

		// dialog: gform/controller/ConfimDialog
		//		used to inform user of pending changes.
		dialog: null,

		progressBar: null,
		progressMessage: null,

		getFallbackSchema: function () {
			return this.fallbackSchema;
		},

		postCreate: function () {
			this.schemaSelector.set("required", true);
			this.own(aspect.after(this.schemaSelector, "onChange", lang.hitch(this, this.onSchemaChange)));
			if (this.progressBar) {
				this.progressBar.set("duration", 0);
			}
			this.own(this.watch("state", this.onLoadOrSave.bind(this)));
			if (this.showSelectButton) {
				this.selectButton.set("onClick", this.gotoTemplate.bind(this));
			}
		},

		gotoTemplate: function(evt) {
		},

		invokeIfOk: function (callback) {
			// summary:
			//		check if there are pending changes. If so a dialog will be displayed to ask the user to either
			//		cancel his action or discard the changes.
			// callback: function
			//		will be invoked if no changes or changes can be discarded.
			var wrappedCallback = function (ok) {
				if (ok) callback();
			};
			var dialogOpened = this._checkState(wrappedCallback);
			if (!dialogOpened) {
				callback();
			}
		},

		_checkState: function (callback) {
			// summary:
			//		check if there are pending changes. If so a dialog will be displayed to ask the user to either
			//		cancel his action or discard the changes.
			// callback: function
			//		will be invoked with parameter true if no changes or changes shall be discarded.
			// return: boolean
			//		true if a dialog was opened
			this.editor.syncPendingChanges();
			var dialogOpened = false;
			if (this.state === "create" && this.editor.hasChanged()) {
				this.startConfirmDialog(messages["actions.unsavedNewEntity"], callback);
				dialogOpened = true;
			} else if (this.state === "edit" && this.editor.hasChanged()) {
				this.startConfirmDialog(messages["actions.unsavedChanges"], callback);
				dialogOpened = true;
			}
			return dialogOpened;
		},
		alert: function (message) {
			// summary:
			//		display messages to user
			// message: String
			alert(message);
		},
		displayError: function (message) {
			alert(message);
		},
		_onStateChange: function () {
			this.progressBar.hide();
			["create", "edit", "loading"].forEach(function (e) {
				domClass.toggle(this.domNode, e, this.state === e);
			}, this);
		},
		onLoadOrSave: function () {
			if (this.editor.modelHandle) {
				var idModel = this.editor.modelHandle.getModelByPath(this.store.idProperty);
				if (idModel) {
					if (this.store.assignableId && this.state == "create") {
						idModel.set("disabled", false);
					} else {
						idModel.set("disabled", true);
					}
				}
			}
		},
		setCtx: function (ctx) {
			var editorCtx = {state: this};
			lang.mixin(editorCtx, ctx);
			this.editor.set("ctx", editorCtx);
		},
		edit: function (id, schemaUrl) {
			// summary:
			//		load entity in editor
			// id:
			//		the id of the entity
			// schemaUrl: String
			//		the schema is loaded from the url.
			this._hideSchemaSelector();
			var dialogOpened = this.invokeIfOk(lang.hitch(this, "_edit", id, schemaUrl));

		},
		_showLoading: function () {
			this.set("state", "loading");
		},
		onSchemaChange: function () {
			if (this.state === "loading") {
				return;
			}
			var schemaUrl = this.schemaSelector.get("value");
			if (schemaUrl && schemaUrl !== "") {
				// if entity with typeProperty but type is not changeable
				var entity = this.editor.getPlainValue();
				var oldSchemaUrl = entity ? entity[this.typeProperty] : null;
				this._switchEditorSchema(schemaUrl, oldSchemaUrl);
			}
		},
		_switchEditorSchema: function (schemaUrl, oldSchemaUrl) {
			if (schemaUrl !== oldSchemaUrl) {
				var entity = this.editor.getPlainValue();
				entity[this.typeProperty] = this.schemaSelector.get("value");
				var promise = this.getSchema(schemaUrl);
				this._execute(promise, "LoadForEntityAndSchema", entity);
			}
		},
		getSchema: function (url) {
			var deferred = new Deferred();
			var p = this.editor.ctx.getSchema(url);
			var me = this;
			when(p).then(function (schema) {
				var error = me.validateSchema(schema);
				if (error) {
					deferred.reject({message: error});
				} else {
					deferred.resolve(schema);
				}
			}, function () {
				deferred.reject("schema " + url + " was not found.");
			});
			return deferred;
		},
		validateSchema: function (schema) {
			var attributes = metaHelper.collectAttributes(schema);
			var requiredAttributes = [this.store.idProperty];
			if (this.typeProperty) {
				requiredAttributes.push(this.typeProperty);
			}

			attributes.forEach(function (attribute) {
				var i = requiredAttributes.indexOf(attribute.code);
				if (i >= 0) {
					requiredAttributes.splice(i, 1);
				}
			});
			if (requiredAttributes.length === 0) {
				return null;
			} else {
				var error = "'" + requiredAttributes.join("', '") + "'";
				return lang.replace(messages['validation.missingAttributes'], {attributes: error});
			}
		},
		_edit: function (id, schemaUrl) {
			if (schemaUrl) {
				// remove form
				this.editor.set("meta", {});
				var schemaPromise = this.getSchema(schemaUrl);
				//promise = all([instancePromise, schemaPromise]);
				this._showLoading();
				this._execute(schemaPromise, "LoadSchemaForEdit", id);
			} else {
				var instancePromise = this.store.get(id);
				this._showLoading();
				this._execute(instancePromise, "LoadForEdit");
			}
		},
		_onLoadSchemaForEdit: function (schema, id) {
			var instancePromise = this.store.get(id);
			this._execute(instancePromise, "LoadForEditAndSchema", schema);
		},
		_onLoadSchemaForEditFailed: function (error, id) {
			var instancePromise = this.store.get(id);
			var fallbackSchemaP = this.getFallbackSchema();
			if (fallbackSchemaP) {
				when(fallbackSchemaP).then(function (fallbackSchema) {
					this._execute(instancePromise, "LoadForEditAndSchema", fallbackSchema);
				}.bind(this));
			} else {
				this.displayError(error.message || "was not able to load schema");
			}
		},
		_onLoadForEdit: function (entity) {
			this.set("state", "edit");
			this.editor.set("plainValue", entity);
			this.onLoaded(this.editor.meta, entity);
		},
		_onLoadForEditFailed: function (error) {
			this.set("state", "edit");
			this.displayError("error while loading entity");
		},
		_onLoadForEditAndSchema: function (entity, schema) {
			this.set("state", "edit");
			try {
				this.editor.setMetaAndPlainValue(schema, entity);
				this.onLoaded(schema, entity);
				this.emit("editor-changed");
			} catch (e) {
				this.displayError("cannot load data into form");
				console.log(e.message, e.stack);
			}
		},
		_onLoadForEditAndSchemaFailed: function (error) {
			this.set("state", "edit");
			this.displayError("error while loading entity");
		},
		_onLoadForEntityAndSchema: function (schema, entity) {
			try {
				if (this.oldValue) {
					this.editor.setMetaAndPlainValue(schema, this.oldValue, true);
					this.editor.modelHandle.update(entity, false);
				} else {
					this.editor.setMetaAndPlainValue(schema, entity, false);
				}
			} catch (e) {
				this.displayError("cannot load data into form");
			}
			this.onLoaded(schema, entity);
			this.emit("editor-changed");
		},
		_onLoadForEntityAndSchemaFailed: function (error) {
			this.set("state", "edit");
			this.displayError(error.message || "error while loading entity");
		},
		startConfirmDialog: function (message, callback, title) {
			// summary:
			//		is called to signal pending changes to user.
			this.dialog.show({title: title, message: message, callback: callback});
		},
		_execute: function (promise, command) {
			var me = this;
			var args = [];
			for (var i = 2; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			var s = this["_on" + command];
			var success = function (result) {
				args.splice(0, 0, result);
				s.apply(me, args);
			};
			var f = this["_on" + command + "Failed"];
			var fail = function (result) {
				args.splice(0, 0, result);
				f.apply(me, args);
			};

			when(promise, success, fail);
		},
		getSelectedSchemaUrl: function () {
			return this.schemaSelector.get("value");
		},
		createNewMulti: function (schemas, typeProperty, createCallback, value) {
			// initialize selector
			this.typeProperty = typeProperty;
			this._initializeSchemaSelector(schemas, true);
			//call createNew with first schemaUrls
			this._createNewInternal(this.getSelectedSchemaUrl(), createCallback, value);
		},
		editMulti: function (schemas, typeProperty, id) {
			// initialize selector
			this.typeProperty = typeProperty;
			this._initializeSchemaSelector(schemas, false);
			//load entity, then retrieve schema by typeProeprt
			var promise = this.store.get(id);
			this._execute(promise, "LoadMulti");
			//call edit with schema nd entity
		},
		_onLoadMulti: function (entity) {
			var type = entity[this.typeProperty];
			this.schemaSelector.set("value", type);
			var schema = this.getSchema(type);
			this._execute(schema, "LoadMultiSchema", entity);
		},
		_onLoadMultiFailed: function (e) {
			this.set("state", "edit");
			this.displayError("cannot load entity ", e);
		},
		_onLoadMultiSchema: function (schema, entity) {
			this.set("state", "edit");
			var type = entity[this.typeProperty];
			this.oldValue = entity;
			this.schemaSelector.set("value", type);
			this.onLoaded(schema, entity);
			try {
				this.editor.setMetaAndPlainValue(schema, entity);
			} catch (e) {
				this.displayError("unable to load data into form");
			}
			this.emit("editor-changed");
		},
		onLoadMultiWithFallback: function (fallbackSchema, entity) {
			this.typeProperty = null;
			this.set("state", "edit");
			this.oldValue = entity;
			this._initializeSchemaSelector([], null);
			try {
				this.editor.setMetaAndPlainValue(fallbackSchema, entity);
				this.onLoaded(fallbackSchema, entity);
			} catch (e2) {
				this.displayError("unable to load data into form");
			}
			this.emit("editor-changed");
		},
		_onLoadMultiSchemaFailed: function (error, entity) {
			this.set("state", "edit");
			var fallbackSchemaP = this.getFallbackSchema();
			if (fallbackSchemaP) {
				when(fallbackSchemaP).then(function (fallbackSchema) {
					this.onLoadMultiWithFallback(fallbackSchema, entity);
				}.bind(this));
			} else {
				this.displayError(error.message || "cannot load schema ");
			}
		},
		_hideSchemaSelector: function () {
			this.schemaSelector.domNode.style.visibility = "hidden";
			this.selectButton.domNode.style.visibility = "hidden";
		},
		createStore: function (schemas) {
			var options = [];
			schemas.forEach(function (schema) {
				var option = {};
				if (typeof schema === "string") {
					option.id = schema;
					option.name = schema;
				} else {
					option.id = schema.code;
					option.name = schema.label;
				}
				options.push(option);
			}, this);
			var store = new Memory({idProperty: "id"});
			store.setData(options);
			return store;
		},
		_initializeSchemaSelector: function (schemas, initializeValue) {
			var store;
			var searchProperty;
			var initialValue;
			if (Array.isArray(schemas)) {
				store = this.createStore(schemas);
				searchProperty = "name";
				initialValue = schemas.length>0 ? schemas[0][store.idProperty] : null;
			} else {
				store = this.editor.ctx.getStore(schemas.store);
				searchProperty = schemas.searchProperty;
				if (schemas.schemaUrl) {
					initialValue = schemas.schemaUrl;
				} else {
					initialValue = null;
				}
			}
			if (store !== null) {
				this.schemaSelector.domNode.style.visibility = "visible";
				this.schemaSelector.set("store", store);
				this.schemaSelector.set("searchProperty", searchProperty);
				if (initializeValue) {
					var selector = this.schemaSelector;
					if (initialValue) {
						selector.set("value", initialValue);
					} else {
						when(store.query({}, {
							count: 1,
							sort: [{attribute: searchProperty, ascending: true}]
						})).then(function (results) {
							selector.set("value", results[0][store.idProperty]);
						});
					}
				}
			} else {
				this.schemaSelector.domNode.style.visibility = "hidden";
			}
		},
		createNew: function (schemaUrl, createCallback, value) {
			// summary:
			//		display empty editor
			// schemaUrl: String
			//		the schema is loaded from the url.
			// callback: function
			//		callback will be called once the entity is saved. id will be passed as single parameter.
			this._hideSchemaSelector();
			this._createNewInternal(schemaUrl, createCallback, value);
		},
		_createNewInternal: function (schemaUrl, createCallback, value) {
			this.createCallback = createCallback;
			if (schemaUrl) {
				this.invokeIfOk(lang.hitch(this, "_createNewAndSchema", schemaUrl, value));
			} else {
				if (this.state === "create") {
					this.editor.reset();
				} else {
					this.invokeIfOk(lang.hitch(this, "_createNew", value));
				}
			}
		},
		_createNew: function (value) {
			this.set("state", "create");
			if (typeof value == "undefined") {
				value = this.createPlainValue(this.editor.meta);
			}
			if (value !== null) {
				// TODO oldValue mst be undefined
				this.editor.set("plainValue", value);
			} else {
				this.editor.initDefault();
			}
			this.oldValue = undefined;//this.editor.getPlainValue();
			this.onCreated(this.editor.meta, value);
		},
		_createNewAndSchema: function (schemaUrl, value) {
			var schemaPromise = this.getSchema(schemaUrl);
			var me = this;
			this._showLoading();
			this._execute(schemaPromise, "LoadForCreateAndSchema", schemaUrl, value);
		},
		createPlainValue: function (schema) {
			if (this.plainValueFactory) {
				return this.plainValueFactory(schema);
			} else {
				return null;
			}
		},
		reload: function (id) {
			if (this.typeProperty) {
				var promise = this.store.get(id ||this.getId());
				this._execute(promise, "LoadMulti");
			} else {
				this._edit(id || this.getId());
			}

		},
		_onLoadForCreateAndSchema: function (schema, schemaUrl, value) {
			this.set("state", "create");
			var value = value || this.createPlainValue(schema);
			if (value !== null) {
				if (this.typeProperty && !(this.typeProperty in value)) {
					value[this.typeProperty] = schemaUrl;
				}
				this.editor.setMetaAndPlainValue(schema, value, false);
			} else {
				if (this.typeProperty) {
					var init = {};
					init[this.typeProperty] = schemaUrl;
					this.editor.setMetaAndPlainValue(schema, init, false);
				} else {
					this.editor.setMetaAndDefault(schema);
				}
			}
			this.oldValue = this.editor.getPlainValue();
			this.onCreated(schema, this.editor.getPlainValue());
			this.emit("editor-changed");
		},
		_onLoadForCreateAndSchemaFailed: function (error) {
			this.set("state", "create");
			this.displayError(error.message || "error while loading schema");
		},
		_removeChangeIndicator: function () {
			var entity = this.editor.get("plainValue");
			this.editor.set("plainValue", entity);
		},
		hasChanged: function () {
			return this.editor.hasChanged();
		},
		onCreate: function (id) {
			// summary:
			//		call when the entity is persisted. will notify the creator of the editor if interested.
			// id: String
			//		the id of the newly persisted entity.
			if (this.createCallback) {
				this.createCallback(id);
			}
			this.createCallback = null;
		},
		reset: function () {
			if (this.typeProperty) {
				if (this.state === "edit") {
					this.reload();
				}
			} else {
				this.editor.reset();
			}
		},
		showProgressBar: function (message) {
			this.progressBar.show();
			// nested attach-points in dialg don't seem to work anymore
			(this.progressMessage || this.progressBar.progressMessage).innerHTML = message;
		},
		hideProgressBar: function () {
			this.progressBar.hide();
		},
		onCreated: function (schema, entity) {
			this.updateActions(schema, entity);
		},
		onLoaded: function (schema, entity) {
			this.updateActions(schema, entity);
			this.onLoadOrSave();
		},
		updateActions: function (schema, entity) {
			var widgets = [];
			var actionFactory = (this.editorFactory || this.editor.editorFactory).actionFactory;
			var actions = actionFactory.getActions(schema, entity);
			var buttons = createActions(actions, this);
			this._removeActions();
			buttons.forEach(function (button) {
				this._addAction(button);
			}, this);
		},
		_addAction: function (button) {
			this.actionContainer.addChild(button);
		},
		getId: function () {
			var value = this.editor.getPlainValue();
			if (value) {
				return this.store.getIdentity(value);
			} else {
				return null;
			}
		},
		_removeActions: function () {
			this.actionContainer.getChildren().forEach(function (child) {
				this.actionContainer.removeChild(child);
			}, this);
		}


	});


});
