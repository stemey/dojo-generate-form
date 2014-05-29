define([  "dojo/_base/declare", "./meta" ], function (declare, metaHelper) {
    // module:
    //		gform/Meta

    var LabelHelper = declare([ ], {
        // summary:
        //		provides convenience functions for schema access. Also abstracts over schema changes.
        getLabel: function (group, modelHandle) {
            return this.getTypeLabel(group, modelHandle);
        },
        getTypeLabel: function (type, modelHandle) {
            var attribute = this.getLabelAttribute(type);
            if (!attribute) {
                return "";
            } else {
                var model = modelHandle.getModelByPath(attribute);
                if (model) {
                    return model.getPlainValue();
                } else {
                    return "";
                }
            }

        },
        getLabelAttribute: function (type) {
            var labelAttribute = null;
            if (type.labelAttribute) {
                labelAttribute = type.labelAttribute;
            } else {
                var candidates = metaHelper.collectAttributes(type).filter(function (a) {
                    if (labelAttribute === null && a.type === "string") {
                        return a.code;
                    }
                });
                labelAttribute = candidates.length>0 ? candidates[0].code : null;
            }
            return labelAttribute;
        }


    });

    return new LabelHelper();

});
