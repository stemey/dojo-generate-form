define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./DecoratorWidget",//
"dojox/mobile/ListItem"
], function(array, lang, declare, DecoratorWidget, ListItem) {
// module:
//		gform/DecoratorFactory
	return declare("gform.DecoratorFactory", null, {
		// summary:
		//		the decoratorFactory creates the decorators wrapped around the attributes.
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create : function(attribute, modelHandle) {
			// summary:
			//		creates the decorator widget
			// attribute: Object
			//		the attribute meta data
			// modelHandle: dojo/Stateful
			//		the modelHandle containing state, messag meta data. These should be dislayed by the decorator
			// returns: dijit/_Container
			//		The widget for the atribute will be added as only child.	
			var item = new DecoratorWidget({meta:attribute});
			return item;
		}	
	})
});
