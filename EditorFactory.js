define([  //
	"dojo/_base/declare",//
	"dojo/Stateful", //
	"./converter/urlToIdConverter", //
	"./converter/anyToTextConverter", //
	"./group/DecoratorFactory", //
	"./validate/UniqueProperties",//
	"./validate/AdditionalProperties",//
	"./validate/Min",//
	"./validate/Max",//
	"./validate/MinItems",//
	"./validate/MaxItems",//
	"./validate/MinLength",//
	"./validate/MaxLength",//
	"./validate/Pattern"//
], function (declare, Stateful, urlToIdConverter, anyToTextConverter, DecoratorFactory, UniqueProperties, AdditionalProperties, Min, Max, MinItems, MaxItems, MinLength, MaxLength, Pattern) {
	// module:
	//		gform/EditorFactory

	return declare("gform.EditorFactory", [Stateful], {
		// summary:
		//		EditorFactory defines the mapping of a gform schema to a widget tree.

		// asyncModelValidation: boolean
		//		dijits validate after setting the value. Therefore model validation must happen asynchronuously
		//		to value change events.
		convertersById: null,
		convertersByType: null,
		functions:null,
		constructor: function () {
			this.groupFactories = {};
			this.convertersById = {};
			this.convertersByType = {};
			this.functions={};
			this.decoratorFactory = new DecoratorFactory();
			this.addConverterForType(urlToIdConverter, "ref");
			this.addConverterForType(urlToIdConverter, "multi-ref");
			this.addConverterForType(anyToTextConverter, "any");

			this.factoryValidators = {
				uniqueProperties: UniqueProperties,
				pattern: Pattern,
				minLength: MinLength,
				maxLength: MaxLength,
				min: Min,
				max: Max,
				minItems: MinItems,
				maxItems: MaxItems,
				additionalProperties: AdditionalProperties
			}
			this.constructorValidators = {};
		},
		createBadge: function (model) {
			return this.decoratorFactory.createBadge(model);
		},
		createGroupModel: function (schema) {
			var factory;
			if (schema.editor) {
				factory = this.getGroupFactory(schema.editor);
			} else {
				factory = this.defaultGroupFactory;
			}
			if (factory === null) {
				throw new Error("cannot find group factory for type " + schema.editor);
			}
			return factory.createModel(schema);
		},
		createAttributeModel: function (attribute) {
			var factory = this.getAttributeFactory(attribute);
			if (factory === null) {
				throw new Error("cannot find attribute factory for type " + attribute.type);
			}
			return factory.createModel(attribute);
		},
		addGroupFactory: function (id, factory) {
			// summary:
			//		add a groupFactory by id
			// id: String
			//		matched against the groupType from the schema
			// factory: gform/api/GroupFactory
			//		the groupFactory
			this.groupFactories[id] = factory;
		},
		setDefaultGroupFactory: function (id) {
			// summary:
			//		set default groupFactory by id
			// id: String
			//		the id of the default groupFactory
			this.defaultGroupFactory = this.groupFactories[id];
		},
		// decoratorFactory:
		//		used to create decorators
		decoratorFactory: null,
		// defaultGroupFactory:
		//		used to create group if groupType property is absent from schema.
		defaultGroupFactory: null,
		// groupFactories:
		//		map of all groupFactories.
		groupFactories: null,
		// attributeFactoryFinder:
		//		manages the attributeFactories.
		attributeFactoryFinder: null,
		createDecorator: function (/*Object*/attribute, /*dojo.Stateful*/modelHandle, decorator) {
			// summary:
			//		creates a Decorator Widget for the given attribute. The Decorator displays the label, description and state of the attribute. The actual widget for editing the attribute's value is added as a child.
			// attribute: Object
			//		The attribute schema.
			// modelHandle: dojo/Stateful
			//		The modelHandle. The Decorator watches the state and value of the attribute via its modelHandle meta data.
			// returns: dijit/Widget
			//		The Widget ich contains all widgets for the attributes and groups contained in the given attribute schema.
			return this.decoratorFactory.create(/*Object*/attribute, /*dojo/stateful*/modelHandle, decorator);
		},
		create: function (group, modelHandle, ctx, options) {
			// summary:
			//		creates a group widget.
			// group: Object
			//		The group schema. If no groupType property is present then the defaultGroupFactory creates the widget.
			// modelHandle: dojo/Stateful
			//		the modelHandle
			// ctx: gform/Context
			//		access to store and schema
			// options: Object
			//		hidden: don't load content of widget. Wait for show to be called on returned widget.
			// return: dijit/Widget
			//		Widget
			if (!group) {
				return null;
			}
			if (group.editor) {
				var groupFactory = this.find(group.editor);
				if (groupFactory == null) {
					throw new Error("cannot find group factory " + group.editor);
				}
				return groupFactory.create(group, modelHandle, ctx, options);
			}
			else {
				return this.defaultGroupFactory.create(group, modelHandle, ctx, options);
			}
		},
		getGroupFactory: function (group) {
			// summary:
			//		get the groupFactory by meta data
			// group: Object
			//		the group meta data
			// returns: gform/api/GroupFactory
			return this.find(group);
		},
		getGroupFactoryMap: function () {
			// summary:
			//		get the map of groupType to groupFactory
			// returns: Object
			return this.groupFactories;
		},
		find: function (groupType) {
			// summary:
			//		get groupFactory by type
			// groupType: String
			//		the groupType as in the meta data
			// returns: gform/api/GroupFactory
			return this.groupFactories[groupType];
		},
		getAttributeFactory: function (attribute) {
			// summary:
			//		get attributeFactory by meta data
			// attribute:
			//		attribute meta data
			// returns: gform/api/AttributeFactory
			return this.attributeFactoryFinder.getFactory(attribute);
		},
		getAttributeFactories: function () {
			// summary:
			//		get all attributeFactories
			// returns:
			return this.attributeFactoryFinder.getAttributeFactories();
		},
		getAttributeFactoryMap: function () {
			// summary:
			//		get the map of editor is to AttributeFactory
			// returns: Object
			return this.attributeFactoryFinder.getAttributeFactoryMap();
		},
		addAttributeFactory: function (af) {
			// summary:
			//		the AttributeFactory
			// returns: id
			return this.attributeFactoryFinder.addAttributeFactory(af);
		},
		getAttributeFactoryById: function (id) {
			// summary:
			//		the AttributeFactory
			// returns: id
			return this.attributeFactoryFinder.getAttributeFactoryMap()[id];
		},
		getModelValidators: function (attribute) {
			// summary:
			//		attach validation to modelHandle.
			//
			var validators = [];
			for (var key in  this.factoryValidators) {
				if (attribute[key]) {
					var validator = this.factoryValidators[key];
					if (validator) {
						validators.push(validator(attribute[key]));

					}
				}
			}
			for (var key in  this.constructorValidators) {
				if (attribute[key]) {
					var validator = this.constructorValidators[key];
					if (validator) {
						validators.push(new validator(attribute[key]));

					}
				}
			}
			return validators;
		},
		createValidateFunction: function (validator) {
			var validateFn = null
			if (this.asyncModelValidation) {
				validateFn = function () {
					setTimeout(function () {
						validator.validate();
					}, 0);
				};
			} else {
				validateFn = function () {
					validator.validate();
				};
			}
			return validateFn;
		},
		factoryValidators: null,
		constructorValidators: null,
		// summary:
		//		get a converter for the given attribute.
		// attribute: object
		//		the attribute meta data. the type property is usually used to lookup a converter
		// ctx: gform/Context
		//		the context provides extra information (e.g. the storeRegistry that can translate from store ids to actual urls).
		getConverter: function (attribute, ctx) {
			var c;
			if (attribute.converter) {
				c = this.convertersById[attribute.converter];

			} else {
				c = this.convertersByType[attribute.type];
			}
			if (typeof c === "function") {
				var conv =  new c(attribute, ctx);
				return {
					format:conv.format.bind(conv),
					parse:conv.parse.bind(conv)
				}
			} else {
				return c;
			}
		},
		// summary:
		//		add a converter for a specific type
		// converter:
		//		The converter may be an instance or a constructor. constructor will be called with the parameters attribute and ctx.
		// type: string
		//		type (e.g. "string", "ref")
		addConverterForType: function (converter, type) {
			this.convertersByType[type] = converter;
		},
		// summary:
		//		add a converter for a specific id (ids an be used in the schema).
		// converter:
		//		The converter may be an instance or a constructor. constructor will be called with the parameters attribute and ctx.
		// id: string
		//		the id is matched against the converter property in the attribute meta data.
		addConverterForid: function (converter, id) {
			this.convertersById[id] = converter;
		},
		addValidator: function (id, validator) {
			this.factoryValidators[id] = validator;
		},
		addCtrValidator: function (id, validator) {
			this.constructorValidators[id] = validator;
		},
		putFunction: function(id,fn) {
			this.functions[id]=fn;
		},
		getFunction: function(id) {
			return this.functions[id];
		}

	});
});
