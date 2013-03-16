define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"
], function(array, lang, declare) {

	var properties={};
			properties["code"]={ type : "string", required:true};
			properties["label"]={ type : "string"};
			properties["description"]={ type : "string"};
			properties["array"]={ type : "boolean"};
			properties["disabled"]={ type : "boolean"};
			return properties;
});
