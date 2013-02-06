define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/equals"//
], function(array, lang, declare, equals) {

	var equalsOptions = {
		getType: function(/*Anything*/ v){
			// summary:
			//		Returns the type of the given value.
			// v: Anything
			//		The value.
			if (v && v.__type) {
				return v.__type;
			}
			return lang.isArray(v) ? "array" : lang.isFunction((v || {}).getTime) ? "date" : v != null && ({}.toString.call(v) == "[object Object]" || lang.isFunction((v || {}).set) && lang.isFunction((v || {}).watch)) ? "object" : "value";
		},
		equalsMeta : function(/* Anything[] */dst,src) {
			return equalsModelHandle(dst.value,src.value);
		}
	}
	var options={};
	lang.mixin(options,equals);
	lang.mixin(options,equalsOptions);
	var equalsModelHandle = function(src,dst) {
		return equals(src,dst, options);
	}
	return equalsModelHandle;
})
