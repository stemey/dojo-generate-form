define([
    "dojo/_base/declare"
], function (declare) {
// module:
//		gform/schema/JsonSchemaConverter

    return declare([], {
        // summary:
        //		converts json schema to gform schema.
        formatToTypeMapping: {
            "date": "date",
            "time": "time",
            "double": "number",
            "int": "number",
            "integer": "number",
            "date-time": "date"
        },
        copy: function (propSource, propTarget, prop, attribute) {
            var value = prop[propSource];
            if (typeof value !== "undefined") {
                attribute[propTarget] = value;
            }
        },
        convertString: function (prop, attribute, converted) {
            var type = this.formatToTypeMapping[prop.type];
            if (!type) {
                this.formatToTypeMapping[prop.format]
            }
            attribute.type = type || prop.type;
            if (prop["enum"]) {
                attribute.values = [];
                for (var key in prop["enum"]) {
                    if (key !== "__parent") {
                        attribute.values.push(prop["enum"][key]);
                    }
                }
            }

        },
        convertInt: function (prop, attribute, converted) {
            attribute.type = "number";
            attribute.numberFormat = "#";
        },
        convertDouble: function (prop, attribute, converted) {
            attribute.type = "number";
            attribute.fractional = "#.#";
        },
        convertBoolean: function (prop, attribute, converted) {
            attribute.type = "boolean";
        },
        convertDate: function (prop, attribute, converted) {
            attribute.type = "date";
        },
        convertArray: function (prop, attribute, converted) {
            attribute.type = "array";
            if (prop.items.type === "object") {
                var group = this.convertGroup(prop.items, converted);
                attribute.type = "array";
                attribute.group = group;
            } else if (typeof prop.items.type === "string") {
                attribute.element = {};
                var type = this.formatToTypeMapping[prop.format];
                attribute.element.type = type || prop.items.type;
            } else {
                var group = this.convertGroup(prop.items, converted);
                attribute.type = "array";
                attribute.group = group;
            }
        },
        convertObject: function (prop, attribute, converted) {
            var group = this.convertGroup(prop, converted);
            attribute.type = "object";
            attribute.group = group;
        },
        addDefaultProps: function (prop, attribute) {
            this.copy("description", "description", prop, attribute);
            this.copy("title", "label", prop, attribute);
            this.copy("required", "required", prop, attribute);
            this.copy("visible", "visible", prop, attribute);
            this.copy("readonly", "readonly", prop, attribute);
        },
        convertAttribute: function (prop, converted) {
            var attribute = {};
            var type = prop.type;
            var betterType = this.formatToTypeMapping[prop.format];
            if (betterType) {
                type = betterType;
            } else {
                betterType = this.formatToTypeMapping[prop.type]
                if (betterType) {
                    type = betterType;
                }
            }
            if (type === "array") {
                this.convertArray(prop, attribute, converted);
            } else if (type === "object" || prop.properties) {
                this.convertObject(prop, attribute, converted);
            } else if (type === "string") {
                this.convertString(prop, attribute, converted);
            } else if (type === "number") {
                this.convertInt(prop, attribute, converted);
            } else if (type === "double") {
                this.convertDouble(prop, attribute, converted);
            } else if (type === "boolean") {
                this.convertBoolean(prop, attribute, converted);
            } else if (type === "date") {
                this.convertDate(prop, attribute, converted);
            } else if (typeof prop.type === "object") {
                attribute.type = "object";
                attribute.group = this.convertGroup(prop, converted);
            } else {
                console.log("unsupported type " + prop.type);
                attribute=null;
            }
            return attribute;
        },
        convertGroup: function (prop, converted) {
            if (prop.type === "object" || prop.properties) {
                return this.convert(prop, converted);
            } else {
                return this.convert(prop.type, converted);
            }
        },
        convert: function (/*Object*/schema, /*Object*/converted, /**local variables*/meta) {
            // summary:
            //		converts a json schema to a gform schema. subschemas with id that have already been converted will be reused.
            // schema: Object
            //		the json schema
            // converter?: Object
            //		the map of original json schema id to converted gform schema
            // returns: Object
            //		the gform schema
            if (!schema.properties) {
                throw new Error("no properties defined in schema " + schema);
            }
            converted = converted || {};
            meta = converted[schema.id];
            if (meta) {
                return meta;
            } else {
                meta = {};
            }
            meta.attributes = [];
            if (schema.id) {
                meta.code = schema.id;
                converted[schema.id] = meta;
            }
            var required = schema.required || [];

            Object.keys(schema.properties).forEach(function (key) {
                var attribute = {};
                var prop = schema.properties[key];
                var attribute = this.convertAttribute(prop, converted);
                if (attribute) {
                    if (required.indexOf(key) >= 0) {
                        attribute.required = true;
                    }
                    attribute.code = key;
                    meta.attributes.push(attribute);
                } else {
                    console.log("cannot handle prop " + key + " of type " + prop.type);
                }
            }, this);
            return meta;
        }
    });


});

