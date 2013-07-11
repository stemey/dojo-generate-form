define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful"
], function(array, lang, declare, Stateful) {
	// module: 
	//		gform/Resolver

	return declare([Stateful], {
	// summary:
	//		Provides access to sibling attributes of modelHandle. 
		getPath: function(modelHandle) {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			return "";
		},
		getParent : function(attributeCode) {
			// summary:
			//		get value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			return this.parent.value.get(attributeCode).value;
		},
		watchParent: function( attributeCode, watchCallback) {
			// summary:
			//		watch value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			// watchCallback: function
			//		callback
			// returns: Object
			//		WatchHandle
			return this.parent.value[attributeCode].watch("value",watchCallback);
		},
	})
});
