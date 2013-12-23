define([ "dojo/_base/array", //
	"dojo/_base/lang",//
	"dojo/_base/declare",//
], function (array, lang, declare, refresolve) {
// module:
//		gform/schema/JsonSchemaConverter

	return declare([], {
		// summary:
		//		converts json schema to gform schema.
		formatToTypeMapping: {
			date: "date",
			time: "time",
			"date-time": "date"
		},
		copy: function (propSource, propTarget, prop, attribute) {
			var value = prop[propSource];
			if (typeof value != "undefined") {
				attribute[propTarget] = value;
			}
		},
		convertAttribute: function (prop, attribute, converted) {
			this.copy("description", "description", prop, attribute);
			this.copy("title", "label", prop, attribute);
			this.copy("required", "required", prop, attribute);
			this.copy("visible", "visible", prop, attribute);
			this.copy("readonly", "readonly", prop, attribute);
			if (prop["enum"]) {
				attribute.values = [];
				for (var key in prop["enum"]) {
					if (key != "__parent") {
						attribute.values.push(prop["enum"][key]);
					}
				}
			}
			if (prop.type == "array") {
				attribute.type = "array";
				if (prop.items.type == "object") {
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
			} else if (prop.type === "object") {
				var group = this.convertGroup(prop, converted);
				attribute.type = "object";
				attribute.group = group;
			} else if (typeof prop.type == "string") {
				var type = this.formatToTypeMapping[prop.format];
				attribute.type = type || prop.type;
			} else {
				var group = this.convertGroup(prop, converted);
				attribute.type = "object";
				attribute.group = group;
			}
		},
		convertGroup: function (prop, converted) {
			if (prop.type == "object") {
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
			for (var key in schema.properties) {
				if (key != "__parent") {
					var attribute = {};
					attribute.code = key;
					var prop = schema.properties[key];
					meta.attributes.push(attribute);
					this.convertAttribute(prop, attribute, converted);
				}
			}
			return meta;
		}
	})


});

