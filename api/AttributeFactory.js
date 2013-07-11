define([ 
	"dojo/_base/declare",//
], function(
	declare
) {
// module: 
//		gform/api/AttributeFactory
	return declare( [],{
		// summary:
		//		An AttributeFactory manages a class of attributes. 
		// description:
		//		Lifecycle:
		//
		//		1. updateModelHandle is called to initialize the modelHandle.
		//		2. create is called to create the widget. The passed modelHandle was initialized in step one.
		//		3. updateModelHandle is called again when the data of the form is set to a new plainValue. Widget is bound to the modelHandle and should display the changes.


		// editorFactory:
		//		AttributeFactory uses editorFactory to create embedded attributes/groups.
		editorFactory: null,
		handles : function(/*Object*/attribute, /*dojo/stateful*/modelHandle) {
			// summary:
			//		check if the attribute can be managed by this AttributeFactory.
			// attribute: Object
			//		The attribute meta data.
			// modelHandle: dojo/Stateful
			//		The modelHandle
			// returns: boolean
			//		returns true if the AttributeFactory can create a Widget for the attribute
			return attribute != null
					&& attribute.validTypes
					&& !attribute.array;
		},
		create : function(/*Object*/attribute, /*dojo/stateful*/modelHandle, /*gform/Context*/ context) {
			// summary:
			//		create a widget and bind it to the modelHandle.
			// attribute: Object
			//		the attribute meta data
			// modelHandle: dojo/Stateful
			//		the modelHandle to bind to the widget
			// context: gform/Context
			//		resolver allows access to sibling attributes and their modelHandles.
			// returns: dijit/_WidgetBase
			//		The widget will be wrapped with a Decorator and added to the widget tree.
		},
		updateModelHandle: function(/*Object*/attribute, /*Object*/plainValue, /*dojo/stateful*/modelHandle, /*gform/Context*/ context) {
			// summary:
			//		create a widget and bind it to the modelHandle.
			// description:
			//		this method is optional. If absent then the standard updateModelHandle operation defied in gform/model/updateModelHandle will be used.
			// attribute: Object
			//		the attribute meta data
			// plainValue: Object
			//		the new value tof the modelHandle
			// modelHandle: dojo/Stateful
			//		the modelHandle to update
			// context: gform/Context
			//		resolver allows access to sibling attributes and their modelHandles.
		},
		getSchema: function() {
			// summary:
			//		return the json schema v0.3 describing the attributes this AttributeFactory can handle. 
			// attribute: Object
			//		the json schema.
		}
		
	})
});
