define([ "dojo/_base/array", "dojo/_base/declare" ], function (array, declare) {
	// module: 
	//		gform/Meta

	var LabelHelper = declare([ ], {
		// summary:
		//		provides convenience functions for schema access. Also abstracts over schema changes.
		getLabel: function (group, modelHandle) {
			return this.getTypeLabel(group, modelHandle);
		},
		getTypeLabel: function (type, modelHandle) {
			var labelAttribute = null;
			if (type.labelAttribute) {
				labelAttribute = type.labelAttribute;
			} else if (type.attributes) {
				array.forEach(type.attributes, function (a) {
					if (labelAttribute == null && a.type === "string") {
						labelAttribute = a.code;
					}
				});
			} else if (type.groups) {
				return this.getTypeLabel(type.groups[0], modelHandle);
			}
			
			if (labelAttribute != null) {
				var model = modelHandle.getModelByPath(labelAttribute);
				return model ? model.getPlainValue() : "";
			} else {
				return null;
			}

		}

	});

	return new LabelHelper();

});
