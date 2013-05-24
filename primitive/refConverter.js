define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at"
], function(array, lang, declare, at) {

	 return {
				format : function(value) {
					if (value == null) {
						return null;
					} else {
						return value.$ref;
					}
				},
				parse : function(value) {
					if (value==null) {
						return null;
					} else {
						return {$ref:value};
					}
				}
			};
});
