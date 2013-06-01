define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//

], function(array, lang, declare) {
	// module: 
	//		gform/Resolver

	var Resolver= declare(null, {
	// summary:
	//		Provides access to sibling attributes of modelHandle. 
		constructor : function(modelHandle, path) {
			this.modelHandle=modelHandle;
			this.path=path || "";
		},
		getPath: function() {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			return this.path;
		},
		get : function(attributeCode) {
			// summary:
			//		get value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			return this.modelHandle.value.get(attributeCode).value;
		},
		watch: function(attributeCode,watchCallback) {
			// summary:
			//		watch value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			// watchCallback: function
			//		callback
			// returns: Object
			//		WatchHandle
			return this.modelHandle.value[attributeCode].watch("value",watchCallback);
		}
	})
	return Resolver;
});
