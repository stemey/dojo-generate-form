define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Textarea",//
"../meta",//
], function(array, lang, declare, at, Textarea, meta) {

	return declare("gform.TextareaAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var props={};
			window.mo=modelHandle;
			props["value"]=at(modelHandle, "value");
			return new Textarea(props);
		}
	});
});
