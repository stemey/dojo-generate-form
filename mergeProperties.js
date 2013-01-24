define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
]
, function(array, lang, declare) {

	var mergeProperties = function( value, target){
			for (var key in target) {
				if (key!="_watchCallbacks" && target.hasOwnProperty(key) && !value.hasOwnProperty(key)) {
					delete target[key];
				}
			}
			for (var key in value) {
				if (key!="_watchCallbacks" &&  !target.hasOwnProperty(key) && value.hasOwnProperty(key)) {
					target[key]=value[key];
				}
			}
		}
	return mergeProperties;
})
