define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mobile/CheckBox",	
], function(array, lang, declare, CheckBox) {

	return declare( [CheckBox], {
		onLabelClick : function(attribute) {
			this.set("checked", !this.get("checked"));
		}


	})
});
