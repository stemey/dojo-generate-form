define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare" ], function(array, lang,
		declare, Container, at, domConstruct,
		 Stateful) {
	// module: 
	//		gform/Meta
	// summary:
	//		provides convenient functions for schema.

	var Meta= declare("gform.Meta", [ ], {
		getType : function(attribute) {
		// summary:
		//		find type of attribute.
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
			return typeCode==this.getType(attribute);
		},
 
	});
	return new Meta();
	
});
