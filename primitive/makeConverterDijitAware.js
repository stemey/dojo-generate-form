define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at"
], function(array, lang, declare, at) {
// module:
//		gform/primitive/makeConverterDijitAware

		return function(converter) {
			// sumary:
			//		the parse function is wrapped. The wrapper checks the dijit's state and throws an exception if the state is "Error".
			// converter: Object
			//		the original converter. Attach the dijit instance to the converter.		
			// returns: Object
			//		returns the wrapped converter 
			var originalParse = converter.parse;
			converter.parse=function(value) {
				if (converter.dijit && converter.dijit.get("state")=="Error") {
					throw new Error("dijit value is invalid");
				} else {
					return originalParse(value);
				}
			}
			return converter;
		}

});
