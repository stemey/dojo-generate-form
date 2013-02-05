define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//

], function(array, lang, declare) {

	return declare("gform.Resolver", null, {
		constructor : function(modelHandle) {
			this.modelHandle=modelHandle;
		},
		get : function(propName) {
			return this.modelHandle.value.get(propName).value;
		},
		watch: function(propName,watchCallback) {
			return this.modelHandle.value[propName].watch("value",watchCallback);
		}
	})
});
