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
		oldType: null,
		typeProperty: null,

		// dialog: gform/controller/ConfimDialog
		//		used to inform user of pending changes.
		dialog: null,

		progressBar: null,
		progressMessage: null,

		getFallbackSchema: function() {
			return this.fallbackSchema;
		},

		postCreate: function () {
			this.own(aspect.after(this.schemaSelector, "onChange", lang.hitch(this, this.onSchemaChange)));
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
		_onStateChange: function () {
			this.progressBar.hide();
			["create", "edit", "loading"].forEach(function (e) {
				domClass.toggle(this.domNode, e, this.state === e);
			}, this);
		},
		setCtx: function (ctx) {
			this.editor.set("ctx", ctx);
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
			var schemaUrl = this.schemaSelector.get("value");
			if (schemaUrl && schemaUrl !== "") {
				// if entity with typeProperty but type is not changeable
				var entity = this.editor.getPlainValue();
				var oldSchemaUrl = entity ? entity[this.typeProperty] : null;
				if (schemaUrl !== oldSchemaUrl) {
					entity[this.typeProperty] = this.schemaSelector.get("value");
					var promise = this.getSchema(schemaUrl);
					this._execute(promise, "LoadForEntityAndSchema", entity);
				}
			}
		},
		getSchema: function (url) {
			var deferred = new Deferred();
			var p = this.editor.ctx.getSchema(url);
			var me =this;
			when(p).then(function (schema) {
				if (!me.isValidSchema(schema)) {
					deferred.reject("invalid schema");
				} else {
					deferred.resolve(schema);
				}
			}).otherwise(function () {
				deferred.reject("schema not found");
			});
			return deferred;
		},
		isValidSchema: function (schema) {
			var attributes = metaHelper.collectAttributes(schema);
			var requiredAttributes = [this.store.idProperty];
			if (this.typeProperty) {
				requiredAttributes.push(this.typeProperty);
			}
			var found = attributes.filter(function (attribute) {
				return requiredAttributes.indexOf(attribute.code) >= 0;
			}).length;
			return found === requiredAttributes.length;
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
			var fallbackSchema = this.getFallbackSchema();
			if (fallbackSchema) {
				this._execute(instancePromise, "LoadForEditAndSchema", fallbackSchema);
			} else {
				this.alert("was not able to load schema");
			}
		},
		_onLoadForEdit: function (entity) {
			this.set("state", "edit");
			this.editor.set("plainValue", entity);
			this.onLoaded(this.editor.meta, entity);
		},
		_onLoadForEditFailed: function (error) {
			this.set("state", "edit");
			alert("error while loading entity");
		},
		_onLoadForEditAndSchema: function (entity, schema) {
			this.set("state", "edit");
			try {
				this.editor.setMetaAndPlainValue(schema, entity);
			} catch (e) {
				console.log(e);
				this.alert("cannot load data into form");
			}
			this.onLoaded(schema, entity);
			this.emit("editor-changed");
		},
		_onLoadForEditAndSchemaFailed: function (error) {
			this.set("state", "edit");
			alert("error while loading entity");
		},
		_onLoadForEntityAndSchema: function (schema, entity) {
			try {
				if (this.oldValue) {
					this.editor.setMetaAndPlainValue(schema, this.oldValue);
					this.editor.modelHandle.update(entity, false);
				} else {
					this.editor.setMetaAndPlainValue(schema, entity);
				}
			} catch (e) {
				console.log(e);
				this.alert("cannot load data into form");
			}
			this.onLoaded(schema, entity);
			this.emit("editor-changed");
		},
		_onLoadForEntityAndSchemaFailed: function (error) {
			this.set("state", "edit");
			this.alert("error while loading entity");
		},
		startConfirmDialog: function (message, callback) {
			// summary:
			//		is called to signal pending changes to user.
			this.dialog.show({message: message, callback: callback});
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
			}
			var f = this["_on" + command + "Failed"];
			var fail = function (result) {
				args.splice(0, 0, result);
				f.apply(me, args);
			}

			when(promise, success, fail);
		},
		getSelectedSchemaUrl: function () {
			return this.schemaSelector.get("value");
		},
		createNewMulti: function (schemas, typeProperty, createCallback, value) {
			// initialize selector
			this.typeProperty = typeProperty;
			this._initializeSchemaSelector(schemas, true);
			this.oldType = this.getSelectedSchemaUrl();
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
			var schema = this.getSchema(type);
			this._execute(schema, "LoadMultiSchema", entity);
		},
		_onLoadMultiFailed: function (e) {
			this.set("state", "edit");
			this.alert("cannot load entity ", e);
		},
		_onLoadMultiSchema: function (schema, entity) {
			this.set("state", "edit");
			var type = entity[this.typeProperty];
			this.oldType = type;
			this.oldValue = entity;
			this.schemaSelector.set("value", type);
			this.onLoaded(schema, entity);
			try {
				this.editor.setMetaAndPlainValue(schema, entity);
			} catch (e) {
				console.log(e);
				this.alert("unable to load data into form");
			}
			this.emit("editor-changed");
		},
		onLoadMultiWithFallback: function (fallbackSchema, entity) {
			this.typeProperty = null;
			this.set("state", "edit");
			this.oldType = null;
			this.oldValue = entity;
			this._initializeSchemaSelector([], null);
			try {
				this.editor.setMetaAndPlainValue(fallbackSchema, entity);
				this.onLoaded(fallbackSchema, entity);
			} catch (e2) {
				console.log(e2);
				this.alert("unable to load data into form");
			}
			this.emit("editor-changed");
		},
		_onLoadMultiSchemaFailed: function (e, entity) {
			this.set("state", "edit");
			var fallbackSchema = this.getFallbackSchema();
			if (fallbackSchema) {
				this.onLoadMultiWithFallback(fallbackSchema, entity);
			} else {
				this.alert("cannot load schema ", e);
			}
		},
		_hideSchemaSelector: function () {
			this.schemaSelector.domNode.style.visibility = "hidden";
		},
		_initializeSchemaSelector: function (schemas, initializeValue) {
			if (schemas.length > 0) {
				this.schemaSelector.domNode.style.visibility = "visible";
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
				this.schemaSelector.set("store", store);
				if (initializeValue) {
					this.schemaSelector.set("value", options[0].id);
				}
				if (schemas.length == 1) {
					this._hideSchemaSelector();
				}
			} else {
				this.schemaSelector.domNode.style.visibility = "hidden";
			}
		},
		createNew: function (schemaUrl, createCallback) {
			// summary:
			//		display empty editor
			// schemaUrl: String
			//		the schema is loaded from the url.
			// callback: function
			//		callback will be called once the entity is saved. id will be passed as single parameter.
			this._hideSchemaSelector();
			this._createNewInternal(schemaUrl, createCallback);
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
				this.editor.set("plainValue", value);
			} else {
				this.editor.initDefault();
			}
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
		_onLoadForCreateAndSchema: function (schema, schemaUrl, value) {
			this.set("state", "create");
			var value = value || this.createPlainValue(schema);
			if (value !== null) {
				if (this.typeProperty && !(this.typeProperty in value)) {
					value[this.typeProperty] = schemaUrl;
				}
				this.editor.setMetaAndPlainValue(schema, value);
			} else {
				this.editor.setMetaAndDefault(schema);
				if (this.typeProperty) {
					this.editor.get("modelHandle").getModelByPath(this.typeProperty).update(schemaUrl);
					this.editor.get("modelHandle").set("oldValue", this.editor.getPlainValue());
				}
			}
			this.onCreated(schema, this.editor.getPlainValue());
			this.emit("editor-changed");
		},
		_onLoadForCreateAndSchemaFailed: function (error) {
			this.set("state", "create");
			alert("error while loading schema");
		},
		_removeChangeIndicator: function () {
			var entity = this.editor.get("plainValue");
			this.editor.set("plainValue", entity);
		},
		hasChanged: function () {
			return this.editor.hasChanged() || this.oldType !== this.schemaSelector.get("value");
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
				this.schemaSelector.set("value", this.oldType);
				// is also triggered asynchronuosly from change event
				this.onSchemaChange();
				this.editor.set("plainValue", this.oldValue || this.createPlainValue(this.editor.meta));
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
		_removeActions: function () {
			this.actionContainer.getChildren().forEach(function (child) {
				this.actionContainer.removeChild(child);
			}, this);
		}


	});


});
