define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/Stateful" //
], function(array, lang, declare, at, Stateful) {

	return declare("app.EditorFactory", [Stateful], {
		constructor : function() {
			this.groupFactories={};
		},
		addGroupFactory: function(id,factory) {
			this.groupFactories[id]=factory;
		},
		setDefaultGroupFactory: function(id) {
			this.defaultGroupFactory=this.groupFactories[id];
		},
		defaultGroupFactory:null,
		create : function(group, modelHandle) {
			if (!group) {
				return null;
			}
			if (group.groupType) {
				var groupFactory =  this.find(group.groupType);
				if (groupFactory==null) {
					throw new Error("cannot find group factory "+group.groupType);
				}
				return groupFactory.create(group, modelHandle);
			} 
			else if (lang.isArray(group.attributes)) {
				return this.defaultGroupFactory.create(group, modelHandle);
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
