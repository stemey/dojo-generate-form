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
			if (value) {
				attribute[propTarget]=value;
			}
		},
		convertAttribute: function(prop,attribute,converted) {
			
			//attribute.type=prop.type;
			this.copy("description","description",prop,attribute);
			this.copy("title","label",prop,attribute);
			this.copy("required","required",prop,attribute);
			this.copy("readonly","readonly",prop,attribute);
			if (prop.enum) {
				attribute.values=[];
				for (var key in prop.enum) {
					if (key!="__parent") {
						attribute.values.push(prop.enum[key]);
					}
				}
			}
			if (prop.type=="object") {
				var types = this.convertObjectProp(prop,converted);
				attribute.type="object";
				attribute.type_property=prop.gform_type_property || "ext_type";
				attribute.validTypes=types;
			}else if (prop.type=="array") {
				attribute.array=true;
				if (prop.items.type=="object") {
					attribute.type="object";
					attribute.type_property=prop.gform_type_property || "ext_type";
					var types = this.convertObjectProp(prop.items,converted);
					attribute.validTypes=types;
				} else if (prop.items.type=="array") {
					throw new Error("cannot convert array of arrays");
				}else{
					attribute.type=prop.items.type;
				}
			}else{
				var type = formatToTypeMapping[prop.format];
				attribute.type=type || prop.type;
			}
		},
		convertObjectProp: function(prop,converted) {
				if (prop.oneOf) {
					return this.convertTypes(prop.oneOf,converted);
				}else	if (prop.properties) {
					return [this.convert(prop,converted)];
				}else{
					throw new Error("cannot only convert objects with oneOf");
				}
		},
		convertTypes: function(schemas,converted) {
			return array.map(schemas,function(schema) {
				return this.convert(schema,converted);
			},this);
		},
		convert: function(schema,converted,/**params*/meta) {
			//schema=ref.resolveJson(schema);
			//refresolve(schema);
			converted=converted||{};
			meta=converted[schema.id];
			if (meta) {
				return meta;
			}else{
				meta={};
			}
			meta.attributes=[];
			meta.code=schema.id;
			converted[schema.id]=meta;
			//return  meta;
			for (var key in schema.properties) {
				// "__parent" is added by dojox/json/ref
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

