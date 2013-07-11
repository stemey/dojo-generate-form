define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare", "./meta" ], function(array, lang,
		declare, metaHelper) {
	// module: 
	//		gform/Meta

	var LabelHelper= declare([ ], {
	// summary:
	//		provides convenience functions for schema access. Also abstracts over schema changes.
		getLabel : function(attribute, modelHandle) {
			var type=metaHelper.getComplexType(attribute, modelHandle); 
			return this.getTypeLabel(type, modelHandle);
		},
		getTypeLabel : function(type, modelHandle) {
			var labelAttribute = null;
			if (type.labelAttribute) {
				labelAttribute = type.labelAttribute;
			} else {
				array.forEach(type.attributes, function(a) {
					if (labelAttribute == null && a.type == "string" && metaHelper.isSingle(a)) {
						labelAttribute = a.code;
					}
				});
				if (labelAttribute!=null) {
					if (modelHandle.value) {
						return modelHandle.value[labelAttribute].value;
					} else {
						// we also support plain values	
						return modelHandle[labelAttribute];
					}
				} else {
					return null;
				}
			}
		},
 
	});

	return new LabelHelper();	
	
});
