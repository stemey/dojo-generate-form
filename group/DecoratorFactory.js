define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"./ExpandableDecoratorWidget",//

], function(array, lang, declare, at, DecoratorWidget, ExpandableDecoratorWidget) {

	return declare("gform.DecoratorFactory", null, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		create : function(attribute, modelHandle) {
			return new DecoratorWidget({meta:attribute, modelHandle:modelHandle});
		}	
	})
});
