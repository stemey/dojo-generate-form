define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojo/Stateful",//
"dojox/mvc/at",//
"./ValidationTextBox",//
"../meta",//
"./copyProperty",
"./copyDijitProperties",
"./mixinTextboxBindings",
"./standardAttributeProperties",
"./extraAttributeProperties"
], function(array, lang, declare, aspect, Stateful, at, TextBox,  meta, copyProperty, copyDijitProperties, mixinTextboxBindings, standardAttributeProperties, extraAttributeProperties) {

	return declare("gform.TextAttributeFactory", [Stateful], {
		handles : function(attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		create : function(attribute, modelHandle) {

			var props={
			}
			mixinTextboxBindings(modelHandle,props);
			copyProperty("pattern",attribute,props)
			copyDijitProperties(attribute,props);
			return new TextBox(props);

		},
		getSchema:function(){
			var schema={};
			schema["id"]="string";
			schema["description"]="This is a textfield based on 'dijit.form.ValidationTextBox'";
			schema["example"]=dojo.toJson({code:'name',type:'string'},true);
			var properties={};
			lang.mixin(properties,standardAttributeProperties);
			//properties["type"]={ type : "string",enum:["string"]};
			extraAttributeProperties.add("required",properties);
			extraAttributeProperties.add("maxLength",properties);
			extraAttributeProperties.add("missingMessage",properties);
			extraAttributeProperties.add("promptMessage",properties);
			extraAttributeProperties.add("placeHolder",properties);
			extraAttributeProperties.add("invalidMessage",properties);
			extraAttributeProperties.add("pattern",properties);
			extraAttributeProperties.add("properCase",properties);
			extraAttributeProperties.add("upperCase",properties);
			schema.properties=properties;
			return schema;
		}
	})
});
