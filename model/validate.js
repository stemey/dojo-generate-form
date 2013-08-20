define([ 
"dojo/_base/lang",//
"dojo/_base/declare",//
"./Validator",//
], function(lang, declare, Validator) {
// module:
//		gform/model/validate

	return function(modelHandle, validators, async) {
			var validator = new Validator({modelHandle:modelHandle, validators:validators});
			if (async) {
				return function() {
					setTimeout(function() {
						validator.validate();
					}, 0);
				}
			} else {
				return function() {
					validator.validate();
				}
			}
		}

});
