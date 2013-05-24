define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at"
], function(array, lang, declare, at) {

	 return {
				format : function(value) {
					if (typeof value == "undefined") {
						return value;
					} else if (value == null) {
						return NaN;
					} else {
						return value;
					}
				},
				parse : function(value) {
					if (typeof value == "undefined") {
						return value;
					} else if (isNaN(value)) {
						return null;
					} else {
						return value;
					}
				}
			};
});
