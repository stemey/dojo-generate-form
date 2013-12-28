define([ ], function () {
// module:
//		gform/primitive/makeConverterDijitAware

	return function (converter) {
		// summary:
		//		the converter is wrapped. The wrapper checks the dijit's state and throws an exception if the state is "Error". The dijit instance needs to be set as converter.dijit.
		// converter: Object
		//		the original converter.
		// returns: Object
		//		returns the wrapped converter
		var wrapper = {};
		var parse = function (value) {
			if (wrapper.dijit && wrapper.dijit.get("state") == "Error") {
				throw new Error("dijit value is invalid");
			} else {
				return converter.parse(value);
			}
		};
		wrapper.format = converter.format;
		wrapper.parse = parse;
		return wrapper;
	};

});
