define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./getPlainValue",//
"./equals"//
], function(array, lang, declare, getPlainValue, equals) {

	return function(modelHandle) {
			if (modelHandle==null) {
				throw new Error("modelHandle is null");
			}else{
				if (modelHandle.__type && modelHandle.__type=="meta") {
					return !equals(getPlainValue(modelHandle.value),modelHandle.oldValue);
				}else{
					throw new Error("not a modelHandle");
				}
			}
	}
})
