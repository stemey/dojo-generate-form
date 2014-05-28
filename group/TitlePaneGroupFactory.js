define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/aspect",
	"./GroupFactory",
	"dijit/TitlePane"
], function (lang, declare, aspect, GroupFactory, TitlePane) {

	return declare([ GroupFactory ], {
		id: "titlepane",
		createWidget: function (group, model) {
			var titlePane = new TitlePane({
				meta: group,
				title: group.title,
				open: group.open
			});
			//make pane content scrollable. important for usage in layout containers	
			titlePane.containerNode.style.overflow = "auto";
			aspect.after(model, "onChange", lang.hitch(this, "onChanged", group.title, titlePane, model));
			return titlePane;
		},

		onChanged: function (title, titlePane, model) {
			var badge = this.editorFactory.createBadge(model);
            titlePane.set("title", title +badge);
		}
	});
});
