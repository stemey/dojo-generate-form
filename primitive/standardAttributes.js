define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"
], function(array, lang, declare) {

	var properties={};
			properties["code"]={ type : "string", required:true};
			properties["required"]={ type : "boolean"};
			properties["disabled"]={ type : "boolean"};
			properties["missingMessage"]={ type : "string"};
			properties["promptMessage"]={ type : "string"};
			properties["placeHolder"]={ type : "string"};
			properties["invalidMessage"]={ type : "string"};
			properties["missingMessage"]={ type : "string"};
			return properties;
});
