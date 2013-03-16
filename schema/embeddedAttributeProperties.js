define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
], function(array, lang, declare) {


		var embedded = {
			id:"embedded",
			type:"object",
			"properties": {
				"type":{type:"string",enum:["object"],required:true},
				"code":{"type":"string",required:true},
				"type_property":{"type":"string",required:true},
				"array":{"type":"boolean"},
				"validTypes": {type:"array",items:{type:"object",oneOf:[{
						{"type":"object",
							"properties": {
								"code":{type:"string",required:"true"},
								"attributes":{"$ref":"attributes"}
						}}
				}]}}
			}
		}

	return embedded;



});
