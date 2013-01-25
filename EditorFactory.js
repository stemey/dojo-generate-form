define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/Stateful", //
"./AttributeFactoryFinder",//
"./group/GroupFactory",//
"./group/TabGroupFactory"//
], function(array, lang, declare, at, Stateful,AttributeFactoryFinder, GroupFactory, TabGroupFactory) {

	return declare("app.EditorFactory", [Stateful], {
		constructor : function() {
			this.groupFactories = {
				"list" : new GroupFactory({
					editorFactory : this
				}),
				"tab" : new TabGroupFactory({
					editorFactory : this
				})
			};
			this.defaultGroupFactory=this.groupFactories["list"];
			this.attributeFactoryFinder = new AttributeFactoryFinder({
				editorFactory : this
			});
		},
		defaultGroupFactory:null,
		create : function(group, modelHandle) {
			if (!group) {
				return null;
			}
			if (group.groupType) {
				return this.find(group.groupType).create(group, modelHandle);
			} 
			else if (lang.isArray(group.attributes)) {
				return this.defaultGroupFactory.create({
					type : {
						attributes : group.attributes
					}
				}, modelHandle);
			}
		},
		find : function(groupType) {
			return this.groupFactories[groupType];
		}

	})
});
