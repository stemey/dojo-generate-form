define([
	'./ListGroupFactory',
	'dijit/layout/BorderContainer',
	"dojo/_base/declare"
], function (ListGroupFactory, BorderContainer, declare) {
// module:
//		gform/group/ListGroupFactory
	return declare([ListGroupFactory], {
		// summary:
		//		the ListGroupFactory handles an array of groups. These are displayed in a list.

		id: "verticalgroup",
		create: function (group, modelHandle, ctx) {
			var listWidget = new BorderContainer({gutters:false});
			for (var index = 0; index < group.groups.length; index++) {
				var childGroup = group.groups[index];
				var childModel = modelHandle.getModelByIndex(index);
				var groupWidget = this.editorFactory.create(childGroup, childModel, ctx);
				groupWidget.region=childGroup.region;
				listWidget.addChild(groupWidget);
			}
			return listWidget;
		}
	});
});
