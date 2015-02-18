define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./ListPane",
	"../model/MultiGroup",
	"./DescriptionWidget"
], function (lang, declare, ListPane, MultiGroup, DescriptionWidget) {
// module:
//		gform/group/ListGroupFactory
	return declare(null, {
		// summary:
		//		the ListGroupFactory handles an array of groups. These are displayed in a list.

		id: "listgroup",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createModel: function (meta, plainValue) {
            var validators = this.editorFactory.getModelValidators(meta);
			var groups = [];
			meta.groups.forEach(function (group) {
				groups.push(this.editorFactory.createGroupModel(group));
			}, this);
			var model = new MultiGroup({validators:validators, schema:meta, groups: groups, required: meta.required === true});
			model.update(plainValue,true,false);
			return model;
		},
		create: function (group, modelHandle, ctx) {
			var listWidget = new ListPane({
				meta: group
			});
			if (group.description) {
				listWidget.addChild(new DescriptionWidget({description: group.description}));
			}
			for (var index = 0; index < group.groups.length; index++) {
				var childGroup = group.groups[index];
				var childModel = modelHandle.getModelByIndex(index);
				var groupWidget = this.editorFactory.create(childGroup, childModel, ctx);
				listWidget.addChild(groupWidget);
			}
			return listWidget;
		}
	});
});
