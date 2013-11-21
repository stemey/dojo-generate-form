define([
	"dojo/_base/declare",
	"./GroupFactory",
	"./ListPane",
	"./DescriptionWidget"

], function (declare, GroupFactory, ListPane, DescriptionWidget) {

	return declare([GroupFactory], {
		createWidget: function (group) {
			var pane = new ListPane({meta: group});
			pane.addChild(new DescriptionWidget({description: group.description}));
			return pane;
		},
		getSchema: function () {
			var properties = {"label": {"type": "string", description: "displayed in a tab."}, "description": {"type": "string", description: "displayed above the attributes."}, "attributes": {"$ref": "attributes"}}
			var schema = {description: "The listpane displays an array of attributes in a list. It is useful inside dijit layout containers because it wraps its content in a 'dijit.layout.ContentPane'."};
			schema.properties = properties;
			schema.required = ["attributes"];
			var example = {groupType: "listpane", label: "Tab name for display in tab", attributes: [
				{code: "name", type: "string"}
			]};
			schema.example = dojo.toJson(example, true);
			return schema;
		}
	})
});
