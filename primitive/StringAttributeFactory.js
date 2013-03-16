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
"./standardAttributeProperties"
], function(array, lang, declare, aspect, Stateful, at, TextBox,  meta, copyProperty, copyDijitProperties, mixinTextboxBindings, standardAttributeProperties) {

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
			var properties={};
			lang.mixin(properties,standardAttributeProperties);
			//properties["type"]={ type : "string",enum:["string"]};
			properties["missingMessage"]={ type : "string"};
			properties["promptMessage"]={ type : "string"};
			properties["placeHolder"]={ type : "string"};
			properties["invalidMessage"]={ type : "string"};
			properties["pattern"]={ type : "string"};
			properties["properCase"]={ type : "boolean"};
			properties["upperCase"]={ type : "boolean"};
			properties["maxLength"]={ type : "number"};
			properties["required"]={ type : "boolean"};
			schema.properties=properties;
			return schema;
		}	
	})
});
