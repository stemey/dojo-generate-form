define([
	"dojo/_base/lang",//
	"dojo/_base/declare"//

], function (lang, declare) {
	// module:
	//		gform/Resolver

	return declare(null, {
		code: null,
		constructor: function () {
			lang.mixin(this, kwArgs);
		},
		isInstance: function (value) {
			return typeof value === this.code;
		},
		isEmpty: function (value) {
			return value === null;
		}
	});

});
