define([
	"dojo/_base/declare",
	"./GroupFactory",
	"./ListPane",
	"./DescriptionWidget"

], function (declare, GroupFactory, ListPane, DescriptionWidget) {

	return declare([GroupFactory], {
		id: "listpane",
		createWidget: function (group) {
			var pane = new ListPane({meta: group});
			pane.addChild(new DescriptionWidget({description: group.description}));
			return pane;
		}
	});
});
