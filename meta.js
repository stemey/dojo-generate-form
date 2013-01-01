define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare" ], function(array, lang,
		declare, Container, at, domConstruct,
		 Stateful) {

	var Meta= declare("kkk", [  ], {
		primitiveTypes: [
			"string","boolean","date","number"
		],
		defaults:{
			"string":"",
			"number":0,
			"boolean":false,
			"date":null
		},
		getDefaultAttributeValue : function(attribute) {
			var  defaultValue=this.defaults[attribute.type];
			return defaultValue;
 		},
		getPrimitiveType : function(attribute) {
			return this.normalizedPrimitiveType(this.getType(attribute));
		},
		getType : function(attribute) {
			if (typeof attribute.type == "string") {
				return attribute.type;
			}else{
				return attribute.type.code;
			}
 		},
 		getTypeAttribute: function(attribute,attributeCode) {
			if (typeof attribute.type == "string") {
				return attribute[attributeCode];
			}else{
				return attribute.type[attributeCode];
			}
 		},
		isType : function(attribute,typeCode) {
			return typeCode==this.getType(attribute);
		},
 		normalizedPrimitiveType: function(code) {
 			var matches= array.filter(this.primitiveTypes,function(type) {
 				return type==code;
 			});
 			if (matches.length==1) {
 				return matches[0];
 			}else{
 				return null;
 			}
 		}
		

	});
	return new Meta();
	
});
