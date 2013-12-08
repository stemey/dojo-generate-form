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
		create : function (/*Object*/group, /*dojo/Stateful*/modelHandle, ctx) {
		// summary:
		//		create a widget for the group. Also create widgets for the contained attriutes/groups  
		// attribute: Object
		//		The attribute meta data.
		// modelHandle: dojo/Stateful
		//		The modelHandle
		// returns: dijit/_WidgetBase
		//		returns the widget
		},
		createModel: function (/*Object*/group,/*local variables*/value) {
		// summary:
		//		collect all contained attributes. Not every group is associated with a unique modelHandle. Therefore groups play a  role in presentation but not in validation and other model operations. This function provides access to the attributes for these operations.
		// group: Object
		//		the group meta data
		// value: Object
		//		the value of the group
		// returns: gform/model/MetaModel
		//		the model
		}
	
	});
});
