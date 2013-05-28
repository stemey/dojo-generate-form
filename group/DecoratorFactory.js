define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./DecoratorWidget",//
], function(array, lang, declare, DecoratorWidget) {
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
			return new DecoratorWidget({meta:attribute, modelHandle:modelHandle});
		}	
	})
});
