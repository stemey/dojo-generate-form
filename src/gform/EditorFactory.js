define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./group/GroupFactory",//
"./group/TabGroupFactory"//
], function(array, lang, declare, at, GroupFactory,TabGroupFactory) {

	return declare("app.EditorFactory", [], {
		constructor : function() {
		},
		groupFactories : {
			"list" : new GroupFactory(),
			"tab" : new TabGroupFactory()
		},
		create : function(group, modelHandle) {
			if (!group) {
				return null;
			}
			if (group.groupType) {
				return this.find(group.groupType)
						.create(editor, modelHandle);
			} else if (lang.isArray(group.attributes)) {
				return this.groupFactories["list"].create({
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
