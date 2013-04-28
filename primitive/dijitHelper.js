define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
], function(array, lang, declare) {

	var standardProps={};
			standardProps["code"]={ type : "string", required:true,description:"the name of the property"};
			standardProps["label"]={ type : "string",description:"the label ofthe property displayed in a form. If empty the code will be displayed."};
			standardProps["description"]={ type : "string",description:"the info text for the property.", editor: "simpletextarea"};
			standardProps["array"]={ type : "boolean",description:"if checked the attribute is an array"};
			standardProps["disabled"]={ type : "boolean",description:"if checked the value is not editable"};

	var extraProps={};
			extraProps["missingMessage"]={ type : "string",description:"the error message for required but empty values."};
			extraProps["promptMessage"]={ type : "string",description:""};
			extraProps["placeHolder"]={ type : "string",description:"the message displayed in a text field when it's value is empty"};
			extraProps["invalidMessage"]={ type : "string",description:"the error message for invalid values"};
			extraProps["pattern"]={ type : "string",description:"the regular expression to validate text values"};
			extraProps["properCase"]={ type : "boolean"};
			extraProps["upperCase"]={ type : "boolean"};
			extraProps["maxLength"]={ type : "number",description:"the maximum length of a text value"};
			extraProps["required"]={ type : "boolean",description:"an empty value is invalid "};
			extraProps["locale"]={ type : "string",description:"the locale used for formatting."};

			
			var allDijitProperties=[];
			for (var key in extraProps) {
				allDijitProperties.push(key);
			}
			for (var key in standardProps) {
				allDijitProperties.push(key);
			}

	var dijitHelper = {
		addSchemaProperty: function(key,props) {
			props[key]=extraProps[key];
		},
		addSchemaProperties: function(props) {
			lang.mixin(props,standardProps);
		},
		copyProperty: function(key,attribute,dijitProps) {
			if (typeof attribute[key] !="undefined" && attribute[key]!=null && attribute[key]!="") {
				dijitProps[key]=attribute[key];
			}
		},
		copyDijitProperties: function(attribute,dijitProps) {
			for (var key in allDijitProperties) {
				this.copyProperty(allDijitProperties[key],attribute,dijitProps);
			}
		},
		getMappedValuesSchema: function() {	
			return {
				type:"object",
				description:"a map of options.",
				additionalProperties:
					{
						type:"array",
						items:{
							type:[
							{type:"string"},
							{type:"object",properties:{label:{type:"string"},value:{type:"string"}}}
							]
					}
				}
			}
		}
	}
			
	return dijitHelper;
});
