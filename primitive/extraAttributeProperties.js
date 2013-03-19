define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"
], function(array, lang, declare) {

	var properties={};
			properties["missingMessage"]={ type : "string",description:"the error message for required but empty values."};
			properties["promptMessage"]={ type : "string",description:""};
			properties["placeHolder"]={ type : "string",description:"the message displayed in a text field when it's value is empty"};
			properties["invalidMessage"]={ type : "string",description:"the error message for invalid values"};
			properties["pattern"]={ type : "string",description:"the regular expression to validate text values"};
			properties["properCase"]={ type : "boolean"};
			properties["upperCase"]={ type : "boolean"};
			properties["maxLength"]={ type : "number",description:"the maximum length of a text value"};
			properties["required"]={ type : "boolean",description:"an empty value is invalid "};
			properties.add = function(key,props) {
				props[key]=properties[key];
			}
			return properties;
});
