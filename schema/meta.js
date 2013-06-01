define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare" ], function(array, lang,
		declare, Container, at, domConstruct,
		 Stateful) {
	// module: 
	//		gform/Meta

	var Meta= declare("gform.Meta", [ ], {
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
 
	});
	return new Meta();
	
});
