define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./DecoratorWidget"
], function (lang, declare, DecoratorWidget) {
// module:
//		gform/DecoratorFactory
	return declare("gform.DecoratorFactory", null, {
		// summary:
		//		the decoratorFactory creates the decorators wrapped around the attributes.
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create: function (attribute, modelHandle) {
			// summary:
			//		creates the decorator widget
			// attribute: Object
			//		the attribute meta data
			// modelHandle: dojo/Stateful
			//		the modelHandle containing state, messag meta data. These should be dislayed by the decorator
			// returns: dijit/_Container
			//		The widget for the atribute will be added as only child.	
			return new DecoratorWidget({meta: attribute, modelHandle: modelHandle});
		}
	});
});
