define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mvc/at",//
"dijit/form/SimpleTextarea",//
"../meta",//
"./mixinTextboxBindings",
"./dijitHelper"
], function(array, lang, declare, aspect, at, SimpleTextarea, meta, mixinTextboxBindings, dijitHelper) {

	return declare("gform.SimpleTextareaAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var props = {};
			mixinTextboxBindings(modelHandle,props);
			dijitHelper.copyDijitProperties(attribute,props);
			dijitHelper.copyProperty("cols", attribute, props);
			dijitHelper.copyProperty("rows", attribute, props);
			return  new SimpleTextarea(props);			
		},
		getSchema:function(){
			var schema={};
			schema["id"]="string";
			schema["description"]="This is a textarea based on 'dijit.form.SimpleTextarea'";
			schema["example"]=dojo.toJson({editor: 'simpletextarea',code:'name',type:'string',cols:30,rows:4},true);
			var properties={};
			properties.type={type:"string",required:true,"enum":["string"]};
			properties.cols={type:"number",places:0,description:"the number of characters per line"}
			properties.rows={type:"number",places:0,description:"the number of rows o text"}
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required",properties);
			dijitHelper.addSchemaProperty("maxLength",properties);
			dijitHelper.addSchemaProperty("missingMessage",properties);
			dijitHelper.addSchemaProperty("promptMessage",properties);
			dijitHelper.addSchemaProperty("placeHolder",properties);

			schema.properties=properties;
			return schema;
		}
	});
});
