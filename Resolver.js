define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//

], function(array, lang, declare) {

	var Resolver= declare("gform.Resolver", null, {
		constructor : function(modelHandle, path) {
			this.modelHandle=modelHandle;
			this.path=path || "";
		},
		getPath: function() {
			return this.path;
		},
		get : function(propName) {
			return this.modelHandle.value.get(propName).value;
		},
		watch: function(propName,watchCallback) {
			return this.modelHandle.value[propName].watch("value",watchCallback);
		}
	})
	return Resolver;
});
