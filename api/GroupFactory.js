define([
    "dojo/_base/declare"
], function (declare) {
// module:
//		gform/api/GroupFactory

	return declare(null, {
	// summary:
	//		GroupFactory manages groups. The converts the group meta data into widgets and delegate to editorFactory to create contained attributes / groups.	

		// editorFactory:
		//		GroupFactory uses editorFactory to create embedded attributes/groups.
		editorFactory: null,
		create : function (/*Object*/group, /*dojo/Stateful*/modelHandle) {
		// summary:
		//		create a widget for the group. Also create widgets for the contained attriutes/groups  
		// attribute: Object
		//		The attribute meta data.
		// modelHandle: dojo/Stateful
		//		The modelHandle
		// returns: dijit/_WidgetBase
		//		returns the widget
		},
		collectAttributes: function (/*Object*/group,/*local variables*/attributes) {
		// summary:
		//		collect all contained attributes. Not every group is associated with a unique modelHandle. Therefore groups play a  role in presentation but not in validation and other model operations. This function provides access to the attributes for these operations.
		// group: Object
		//		the group meta data
		// returns: Array
		//		An array of all contained attributes.			
		},
		getSchema: function () {
		// summary:
		//		create a json schema v0.3 to describes the group meta data this factory handles.
		// returns: Object
		//		json schema.			
		}
	
	})
});
