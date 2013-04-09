define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mvc/at",//
"dijit/form/Textarea",//
"../meta",//
], function(array, lang, declare, aspect, at, Textarea, meta) {

	return declare("gform.TextareaAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var textarea = new Textarea({
				"value" : at(modelHandle, "value")
			});
			
			return textarea;
		}
	});
});
