define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"
], function(array, lang, declare) {

	var properties={};
			properties["code"]={ type : "string", required:true,description:"the name of the property"};
			properties["label"]={ type : "string",description:"the label displayed in the form. If empty the code will be displayed."};
			properties["description"]={ type : "string",description:"the info text for the property."};
			properties["array"]={ type : "boolean",description:"if checked the attribute is an array"};
			properties["disabled"]={ type : "boolean",description:"if checked the value is not editable"};
			return properties;
});
