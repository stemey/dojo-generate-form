define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
, function(array, lang, declare) {

	var copyProperties = function(value, target){
			for (var key in value) {
				if (key!=_watchCallbacks) {
					target[key]=value[key];
				}
			}
		}
	return copyProperties;
})
