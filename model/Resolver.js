define([ "dojo/_base/array", //
	"dojo/_base/lang",//
	"dojo/_base/declare"//

], function (array, lang, declare) {
	// module: 
	//		gform/Resolver

	var Resolver = declare(null, {
		// summary:
		//		Provides access to sibling attributes of modelHandle.
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		getPath: function (modelHandle) {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			return "";
		},
		get: function (modelHandle, attributeCode) {
			// summary:
			//		get value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			return modelHandle.parent.value.get(attributeCode).value;
		},
		watch: function (modelHandle, attributeCode, watchCallback) {
			// summary:
			//		watch value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			// watchCallback: function
			//		callback
			// returns: Object
			//		WatchHandle
			return modelHandle.parent.value[attributeCode].watch("value", watchCallback);
		},
	})
	return new Resolver();
});
