define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojo/Stateful",//
"dojox/mvc/at",//
"./DatePickerTextBox",//
"../../schema/meta",//
"../../primitive/mixinTextboxBindings",
"../../primitive/dijitHelper"
], function(array, lang, declare, aspect, Stateful, at, DatePickerTextBox,  meta, mixinTextboxBindings, dijitHelper) {

	return declare( [], {
		handles : function(attribute) {
			return meta.isType(attribute, "date") && !attribute.array;
		},
		create : function(attribute, modelHandle, ctx) {

			var props={
				ctx:ctx
			}
			mixinTextboxBindings(modelHandle,props);
			dijitHelper.copyProperty("pattern",attribute,props)
			dijitHelper.copyDijitProperties(attribute,props);
			
			var textBox = new DatePickerTextBox(props);
			return textBox;

		},
		getSchema:function(){
			var schema={};
			schema["id"]="string";
			schema["description"]="This is a textfield based on 'dijit.form.ValidationTextBox'";
			schema["example"]=dojo.toJson({code:'name',type:'string'},true);
			var properties={};
			properties.type={type:"string",required:true,"enum":["string"]};
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required",properties);
			dijitHelper.addSchemaProperty("maxLength",properties);
			dijitHelper.addSchemaProperty("missingMessage",properties);
			dijitHelper.addSchemaProperty("promptMessage",properties);
			dijitHelper.addSchemaProperty("placeHolder",properties);
			dijitHelper.addSchemaProperty("invalidMessage",properties);
			dijitHelper.addSchemaProperty("pattern",properties);
			dijitHelper.addSchemaProperty("properCase",properties);
			dijitHelper.addSchemaProperty("upperCase",properties);

			schema.properties=properties;
			return schema;
		}


	})
});
