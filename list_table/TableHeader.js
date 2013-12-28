define([  "dojo/_base/declare", "dijit/_WidgetBase",
	"dijit/_Container"
], function (declare, _WidgetBase, _Container) {

	return declare("gform.list_table.TableHeader", [ _WidgetBase, _Container ], {
		buildRendering: function () {
			// summary:
			// 		Construct the UI for this widget, setting this.domNode.

			if (!this.domNode) {
				// Create root node if it wasn't created by _Templated
				this.domNode = this.srcNodeRef || this.ownerDocument.createElement("thead");
			}
			this.inherited(arguments);

		}
	});

});
