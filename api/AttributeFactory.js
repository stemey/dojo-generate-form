define([
	"dojo/_base/declare"
], function (declare) {
// module: 
//		gform/api/AttributeFactory
	return declare([], {
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
		handles: function (/*Object*/attribute, /*dojo/stateful*/modelHandle) {
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
		create: function (/*Object*/attribute, /*dojo/stateful*/model, /*gform/Context*/ context) {
			// summary:
			//		create a widget and bind it to the modelHandle.
			// attribute: Object
			//		the attribute meta data
			// model: dojo/Stateful
			//		the modelHandle to bind to the widget
			// context: gform/Context
			//		resolver allows access to sibling attributes and their modelHandles.
			// returns: dijit/_WidgetBase
			//		The widget will be wrapped with a Decorator and added to the widget tree.
		},
		createModel: function (/*Object*/attribute, /*Object*/plainValue) {
			// summary:
			//		create a model.
			// attribute: Object
			//		the attribute meta data
			// plainValue: Object
			//		the new value of the model
			// returns: gform/model/Model
			//		the model
		}

	});
});
