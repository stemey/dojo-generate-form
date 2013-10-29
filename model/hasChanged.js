define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./getPlainValue",//
"./equals"//
], function(array, lang, declare, getPlainValue, equals) {
// module:
//		gform/model/hasChanged

	return function(modelHandle) {
	// summary:
	//		return true if old and new values are equal
	// modelHandle: dojo/Stateful
	//		the modelHandle
	// returns: Boolean			
			if (modelHandle==null) {
				throw new Error("modelHandle is null");
			}else{
				return modelHandle.hasChanged();
			}
	}
})
