define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at"
], function(array, lang, declare, at) {

	 return {
				format : function(value) {
					return value == null ? "" : value;
				},
				parse : function(value) {
					if (value == "" || isNaN(value)) {
						return null;
					} else {
						return value;
					}
				}
			};
});
