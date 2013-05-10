define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"gform/schema/refresolve",
], function(array, lang, declare, refresolve) {

  var formatToTypeMapping= {
		date:"date",
		time:"time",
		"date-time":"date-time"
	}	

	var convert = {
		copy: function(propSource,propTarget,prop,attribute) {
			var value = prop[propSource];
			if (typeof value != "undefined") {
				attribute[propTarget]=value;
			}
		},
		convertAttribute: function(prop,attribute,converted) {
			this.copy("description","description",prop,attribute);
			this.copy("title","label",prop,attribute);
			this.copy("required","required",prop,attribute);
			this.copy("visible","visible",prop,attribute);
			this.copy("readonly","readonly",prop,attribute);
			if (prop["enum"]) {
				attribute.values=[];
				for (var key in prop["enum"]) {
					if (key!="__parent") {
						attribute.values.push(prop["enum"][key]);
					}
				}
			}
			if (prop.type=="array") {
				attribute.array=true;
				if (prop.items.type == "object") {
					var types = this.convertType(prop.items,converted);
					attribute.type="object";
					attribute.type_property=prop.gform_type_property || "ext_type";
					attribute.validTypes=types;
				}else	if (typeof prop.items.type == "string") {
					var type = formatToTypeMapping[prop.format];
					attribute.type=type || prop.items.type;
				}else{
					var types = this.convertType(prop.items,converted);
					attribute.type="object";
					attribute.type_property=prop.gform_type_property || "ext_type";
					attribute.validTypes=types;
				}
			}else if (prop.type == "object") {
				var types = this.convertType(prop,converted);
				attribute.type="object";
				attribute.type_property=prop.gform_type_property || "ext_type";
				attribute.validTypes=types;
			}else if (typeof prop.type == "string") {
				var type = formatToTypeMapping[prop.format];
				attribute.type=type || prop.type;
			}else{
				var types = this.convertType(prop,converted);
				attribute.type="object";
				attribute.type_property=prop.gform_type_property || "ext_type";
				attribute.validTypes=types;
			}
		},
		convertType: function(prop,converted) {
			if (prop.type=="object") {
					return [this.convert(prop,converted)];
			} else if (lang.isArray(prop.type)){
				var types= [];
				array.forEach(prop.type,function(schema) {
					if (typeof schema != "string") {
						types.push(this.convert(schema,converted));
					}
				},this);
				return types;
				
			}else{
				return [this.convert(prop.type,converted)];
			}
		},
		convert: function(schema,converted,/**local variables*/meta) {
			if (!schema.properties) {
				throw new Error("no properties defined in schema "+schema);
			}
			converted=converted||{};
			meta=converted[schema.id];
			if (meta) {
				return meta;
			}else{
				meta={};
			}
			meta.attributes=[];
			if (schema.id) {	
				meta.code=schema.id;
				converted[schema.id]=meta;
			}
			for (var key in schema.properties) {
				if (key!="__parent") {
					var attribute={};
					attribute.code=key;
					var prop = schema.properties[key];
					meta.attributes.push(attribute);
					this.convertAttribute(prop,attribute,converted);
				}
			}		
			return meta;
		}
	}

	return lang.hitch(convert,"convert");
});

