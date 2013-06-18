define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare" ], function(array, lang,
		declare, Container, at, domConstruct,
		 Stateful) {
	// module: 
	//		gform/Meta

	var Meta= declare([ ], {
	// summary:
	//		provides convenience functions for schema access. Also abstracts over schema changes.
		getType : function(attribute) {
		// summary:
		//		find type of attribute.
		// attribute: Object
		//		the attribute meta data 
		// returns: String
		//		the primitive type
			if (!attribute.type) {
				return null;
			}
			if (typeof attribute.type == "string") {
				return attribute.type;
			}else{
				return attribute.type.code;
			}
 		},
		getTypeProperty : function(attribute) {
		// summary:
		//		find type of attribute.
		// attribute: Object
		//		the attribute meta data 
		// returns: String
		//		the primitive type
			return attribute.type_property;
 		},
		isType : function(attribute,typeCode) {
		// summary:
		//		check if attribute is of given type.
		// attribute:
		//		attribute meta data.
		// typeCode:
		//		the expected type.
		// returns: boolean
			return typeCode==this.getType(attribute);
		},
		getComplexType: function(attribute, modelHandle) {
			if (!attribute.validTypes) {
				throw new Error("not a complex attribute");
			}
			if (modelHandle.value==null) {
				if (attribute.validTypes.length==1){
					return attribute.validTypes[0];
				}else{
					return null;
				}
			}
			return this.getFromValidTypes(attribute.validTypes, modelHandle.value[attribute.type_property].value);
		},
		isSingleComplex: function(meta) {
			return this.isSingle(meta) && this.isComplex(meta);
		},
		isSingle: function(meta) {
			return !meta.array && !meta.map;
		},
		isPrimitive: function(meta) {
			return !meta.validTypes;
		},
		isArray: function(meta) {
			return meta.array;
		},
		isComplex: function(meta) {
			return meta.validTypes;
		},
		createElement: function(meta) {
			var element ={};
			lang.mixin(element, meta);
			delete element.array;
			return element;	
		},
		getFromValidTypes: function(/*Array*/validTypes, /*String*/typeCode) {
			// summary:
			//		get the schema for a certain type from the array of types.
			// validTypes:
			//		the array of valid types. This is a required property of complex attributes.
			// typeCode:
			//		the code of one of the types in the array.
			// returns: Object
			//		returns the element of the validTypes array with the specified code 
			if (validTypes.length==1) {
				return validTypes[0];
			}
			var types=array.filter(validTypes,function(type) {
				if (type.code==typeCode) {
					return type;
				}
			});
			return types.length > 0 ? types[0] : null;
		},
 
	});
	return new Meta();
	
});
