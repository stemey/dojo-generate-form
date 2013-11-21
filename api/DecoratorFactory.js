define([
    "dojo/_base/declare"
], function (declare) {
// module:
//		gform/api/DecoratorFactory
	return declare([], {
		// summary:
		//		the DecoratorFactory creates the decorators wrapped around the attributes. 
		// description:
		//		The Decorator displays static and dynamic meta data about the attribute:
		//		 
		//		* label
		//		* description
		//		* error message
		//		* required property
		create : function (attribute, modelHandle) {
			// summary:
			//		creates the decorator widget
			// attribute: Object
			//		the attribute meta data
			// modelHandle: dojo/Stateful
			//		The meta data of the modelHandle contains state information. This should be displayed by this Decorator.
			// returns: dijit/_WidgetBase
		}
	});
});
