define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mvc/equals",//
], function(array, lang, declare,aspect,equals) {

		
		return function(modelHandle,widget,widgetPropName) {
			widget.watch(widgetPropName,function(propName,old,nu) {
				if (!equals(old,nu) && !equals(nu,modelHandle.value)) {
					modelHandle.set("value",nu);
				}
			});
			var valueWatch = modelHandle.watch("value",function(propName,old,nu) {
				if (!equals(old,nu) && !equals(nu,widget[widgetPropName])) {
					widget.set(widgetPropName,nu);
				}
			});
			aspect.after(widget,"destroy",function() {
				valueWatch.remove()
			});
		}
});
