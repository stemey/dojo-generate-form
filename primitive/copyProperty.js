define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"dijit/form/NumberTextBox",//
		"../meta"//

		],
		function(array, lang, declare) {
			
			
			return function(name,attribute,props) {
				if (attribute[name]) {
					props[name]=attribute[name];
				}
			}
		});
