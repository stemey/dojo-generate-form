define([  //
	"dojo/_base/declare",//
	"dojo/Stateful", //
	"./converter/urlToIdConverter", //
	"./group/DecoratorFactory", //
	"./validate/UniqueProperties",//
	"./validate/Min",//
	"./validate/Max",//
	"./validate/MinItems",//
	"./validate/MaxItems",//
	"./validate/MinLength",//
	"./validate/MaxLength",//
	"./validate/Pattern"//
], function (declare, Stateful, urlToIdConverter, DecoratorFactory, UniqueProperties, Min, Max, MinItems, MaxItems, MinLength, MaxLength, Pattern) {
	// module: 
	//		gform/EditorFactory

	return declare("gform.EditorFactory", [Stateful], {
		// summary:
		//		EditorFactory defines the mapping of a gform schema to a widget tree.

		// asyncModelValidation: boolean
		//		dijits validate after setting the value. Therefore model validation must happen asynchronuously
		//		to value change events.
		convertersById: {},
		convertersByType: {},
		constructor: function () {
			this.groupFactories = {};
			this.decoratorFactory = new DecoratorFactory();
			this.addConverterForType(urlToIdConverter, "ref");
		},
		createGroupModel: function (schema, plainValue) {
			var factory;
			if (schema.editor) {
				factory = this.getGroupFactory(schema.editor);
			} else {
				factory = this.defaultGroupFactory;
			}
			if (factory == null) {
				throw new Error("cannot find group factory for type " + schema.editor);
			}
			return factory.createModel(schema, plainValue);
		},
		createAttributeModel: function (attribute, plainValue) {
			var factory = this.getAttributeFactory(attribute);
			if (factory == null) {
				throw new Error("cannot find attribute factory for type " + attribute.type);
			}
			return factory.createModel(attribute, plainValue);
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
		createDecorator: function (/*Object*/attribute, /*dojo.Stateful*/modelHandle) {
			// summary:
			//		creates a Decorator Widget for the given attribute. The Decorator displays the label, description and state of the attribute. The actual widget for editing the attribute's value is added as a child.
			// attribute: Object			
			//		The attribute schema.
			// modelHandle: dojo/Stateful			
			//		The modelHandle. The Decorator watches the state and value of the attribute via its modelHandle meta data.
			// returns: dijit/Widget
			//		The Widget ich contains all widgets for the attributes and groups contained in the given attribute schema.	
			return this.decoratorFactory.create(/*Object*/attribute, /*dojo/stateful*/modelHandle);
		},
		create: function (group, modelHandle, ctx) {
			// summary:
			//		creates a group widget.
			// group: Object
			//		The group schema. If no groupType property is present then the defaultGroupFactory creates the widget.
			// modelHandle: dojo/Stateful
			//		the modelHandle
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
				return groupFactory.create(group, modelHandle, ctx);
			}
			else {
				return this.defaultGroupFactory.create(group, modelHandle, ctx);
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
			// returns: Array
			return this.attributeFactoryFinder.getAttributeFactories();
		},
		getAttributeFactoryMap: function () {
			// summary:
			//		get the map of editor is to AttributeFactory
			// returns: Object
			return this.attributeFactoryFinder.getAttributeFactoryMap();
		},
		getModelValidators: function (attribute) {
			// summary:
			//		attach validation to modelHandle.
			//
			var validators = [];
			for (var key in  this.arrayValidators) {
				if (attribute[key]) {
					var validate = this.arrayValidators[key];
					if (validate) {
						validators.push(validate(attribute[key]));
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
		arrayValidators: {
			uniqueProperties: UniqueProperties,
			pattern: Pattern,
			minLength: MinLength,
			maxLength: MaxLength,
			min: Min,
			max: Max,
			minItems: MinItems,
			maxItems: MaxItems
		},
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
				return new c(attribute, ctx);
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
		}

	});
});
