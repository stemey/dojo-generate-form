define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare" ], function (array, lang, declare, Container, at, domConstruct, Stateful) {
    // module:
    //		gform/Meta

    var Meta = declare([ ], {
        // summary:
        //		provides convenience functions for schema access. Also abstracts over schema changes.
        getType: function (attribute) {
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
            }
        },
        getTypeProperty: function (attribute) {
            // summary:
            //		find type of attribute.
            // attribute: Object
            //		the attribute meta data
            // returns: String
            //		the primitive type
            return attribute.type_property;
        },
        isType: function (attribute, typeCode) {
            // summary:
            //		check if attribute is of given type.
            // attribute:
            //		attribute meta data.
            // typeCode:
            //		the expected type.
            // returns: boolean
            return typeCode == this.getType(attribute);
        },
        getComplexType: function (attribute, model) {
			if (attribute.group) {
				return attribute.group;
			}
            if (!attribute.groups) {
                throw new Error("not a complex attribute");
            }
            if (attribute.groups.length == 1) {
                return attribute.validTypes[0];
            }
            if (model == null) {
                if (attribute.groups.length == 1) {
                    return attribute.groups[0];
                } else {
                    return null;
                }
            }
            return this.getFromValidTypes(attribute.groups, model[attribute.typeProperty]);
        },
        isSingleComplex: function (meta) {
            return this.isSingle(meta) && this.isComplex(meta);
        },
        isSingle: function (meta) {
            return !this.isMap(meta) && !this.isArray(meta);
        },
        isPrimitive: function (meta) {
            return !meta.groups && !meta.group;
        },
        isArray: function (meta) {
            return meta.type === "array";
        },
        isMap: function (meta) {
            return meta.type === "map";
        },
        isSingleObject: function (meta) {
            return meta.attributes || meta.group;
        },
        isMultiObject: function (meta) {
            return  meta.type == "multi-object" || meta.groups;
        },
        isComplex: function (meta) {
            return  this.isSingleObject(meta) || this.isMultiObject(meta);
        },
        createElement: function (meta) {
            var element = {};
            lang.mixin(element, meta);
            delete element.array;
            return element;
        },
		collectAttributesWithoutAdditional: function (schema, excludedProperties) {
			if (!excludedProperties) {
				excludedProperties=[];
			}
			if (schema.additionalProperties) {
				excludedProperties.push(schema.additionalProperties.code);
			}
			return this.collectAttributes(schema,excludedProperties);
		},
        collectAttributes: function (schema, excludedProperties) {
			if (!excludedProperties) {
				excludedProperties=[];
			}
            if (schema.attributes) {
                return schema.attributes.filter(function(attribute) {
					return excludedProperties.indexOf(attribute.code)<0;
				});
            } else if (schema.attribute && excludedProperties.indexOf(schema.attribute.code)<0) {
                return [schema.attribute];
            } else if (schema.group) {
                return this.collectAttributes(schema.group, excludedProperties);
            } else if (schema.groups) {
                var attributes = [];
                schema.groups.forEach(function (group) {
                    attributes=attributes.concat(this.collectAttributes(group, excludedProperties));
                }, this);
                return attributes;
            } else {
                return [];
            }
        },
        getFromValidTypes: function (/*Array*/groups, /*String*/typeCode) {
            // summary:
            //		get the schema for a certain type from the array of types.
            // groups:
            //		the array of valid types. This is a required property of complex attributes.
            // typeCode:
            //		the code of one of the types in the array.
            // returns: Object
            //		returns the element of the validTypes array with the specified code
            if (groups.length == 1) {
                return groups[0];
            }
            var types = array.filter(groups, function (type) {
                if (type.code == typeCode) {
                    return type;
                }
            });
            return types.length > 0 ? types[0] : null;
        }

    });
    return new Meta();

});
