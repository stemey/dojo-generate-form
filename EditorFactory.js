define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/Stateful", //
"./Resolver", //
"./group/DecoratorFactory" //
], function(array, lang, declare, at, Stateful, Resolver, DecoratorFactory) {
	// module: 
	//		gform/EditorFactory
	// summary:
	//		An editorFactory defines the mapping of a gform schema to a widget tree.	

	return declare("gform.EditorFactory", [Stateful], {
		constructor : function() {
			this.groupFactories={};
			this.decoratorFactory=new DecoratorFactory();
		},
		addGroupFactory: function(id,factory) {
			this.groupFactories[id]=factory;
		},
		setDefaultGroupFactory: function(id) {
			this.defaultGroupFactory=this.groupFactories[id];
		},
		decoratorFactory: null,
		defaultGroupFactory:null,
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
		create : function(group, modelHandle) {
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
				return groupFactory.create(group, modelHandle, new Resolver(modelHandle));
			} 
			else if (lang.isArray(group.attributes)) {
				return this.defaultGroupFactory.create(group, modelHandle, new Resolver(modelHandle));
			}
		},
		getGroupFactory: function(group) {
			return this.find(group.groupType);
		},
		getGroupFactoryMap: function() {
			return this.groupFactories;
		},
		getUpdateModelHandle: function(meta) {
			var factory=this.attributeFactoryFinder.getFactory(meta);
			return factory;
		},
		find : function(groupType) {
			return this.groupFactories[groupType];
		},
		getAttributeFactories: function() {
			return this.attributeFactoryFinder.getAttributeFactories();
		},
		getAttributeFactoryMap: function() {
			return this.attributeFactoryFinder.getAttributeFactoryMap();
		}

	});
});
