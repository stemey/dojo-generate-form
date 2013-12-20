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
			aspect.after(model, "onChanged", lang.hitch(this, "onChanged", titlePane, model));
			return titlePane;
		},

		onChanged: function (titlePane, model) {
			var titlePaneWidget = e.source;
			var titlePane = titlePaneWidget.get("meta");
			if (model.get("errorCount") > 0) {
				titlePaneWidget.set("title", titlePane.title + "<span class='errorTooltipNode'>" + titlePaneWidget.get("errorCount") + "</span>");
			} else {
				titlePaneWidget.set("title", titlePane.title);
			}
		}
	});
});
