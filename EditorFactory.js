define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/Stateful", //
"./Context", //
"./group/DecoratorFactory", //
"./validate/UniqueProperties",//
"./model/path"
], function(array, lang, declare, at, Stateful, Context, DecoratorFactory, UniqueProperties, path) {
	// module: 
	//		gform/EditorFactory

	return declare("gform.EditorFactory", [Stateful], {
	// summary:
	//		EditorFactory defines the mapping of a gform schema to a widget tree.	
		constructor : function() {
			this.groupFactories={};
			this.decoratorFactory=new DecoratorFactory();
		},
		addGroupFactory: function(id,factory) {
		// summary:
		//		add a groupFactory by id
		// id: String
		//		matched against the groupType from the schema
		// factory: gform/api/GroupFactory
		//		the groupFactory
			this.groupFactories[id]=factory;
		},
		setDefaultGroupFactory: function(id) {
		// summary:
		//		set default groupFactory by id
		// id: String
		//		the id of the default groupFactory
			this.defaultGroupFactory=this.groupFactories[id];
		},
		// decoratorFactory:
		//		used to create decorators
		decoratorFactory: null,
		// defaultGroupFactory:
		//		used to create group if groupType property is absent from schema.
		defaultGroupFactory:null,
		// groupFactories:
		//		map of all groupFactories.
		groupFactories: null,
		// attributeFactoryFinder:
		//		manages the attributeFactories.
		attributeFactoryFinder: null,
		createDecorator: function(/*Object*/attribute, /*dojo.Stateful*/modelHandle) {
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
		create : function(group, modelHandle, ctx) {
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
			if (group.groupType) {
				var groupFactory =  this.find(group.groupType);
				if (groupFactory==null) {
					throw new Error("cannot find group factory "+group.groupType);
				}
				return groupFactory.create(group, modelHandle, ctx);
			} 
			else if (lang.isArray(group.attributes)) {
				return this.defaultGroupFactory.create(group, modelHandle, ctx);
			}
		},
		getGroupFactory: function(group) {
			// summary:
			//		get the groupFactory by meta data
			// group: Object
			//		the group meta data
			// returns: gform/api/GroupFactory
			return this.find(group.groupType);
		},
		getGroupFactoryMap: function() {
			// summary:
			//		get the map of groupType to groupFactory
			// returns: Object
			return this.groupFactories;
		},
		find : function(groupType) {
			// summary:
			//		get groupFactory by type
			// groupType: String
			//		the groupType as in the meta data
			// returns: gform/api/GroupFactory
			return this.groupFactories[groupType];
		},
		getAttributeFactory: function(attribute) {
			// summary:
			//		get attributeFactory by meta data
			// attribute:
			//		attribute meta data
			// returns: gform/api/AttributeFactory
			return this.attributeFactoryFinder.getFactory(attribute);
		},
		getAttributeFactories: function() {
			// summary:
			//		get all attributeFactories
			// returns: Array
			return this.attributeFactoryFinder.getAttributeFactories();
		},
		getAttributeFactoryMap: function() {
			// summary:
			//		get the map of editor is to AttributeFactory
			// returns: Object
			return this.attributeFactoryFinder.getAttributeFactoryMap();
		},
		getModelValidators: function(attribute) {
		// summary:
		//		attach validation to modelHandle.  
		//
			var validators =[];
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
		arrayValidators:{
			uniqueProperties: UniqueProperties
		}
		


	});
});
