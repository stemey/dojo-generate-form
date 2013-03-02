define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/json/ref",
], function(array, lang, declare, ref) {

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
		convertAttribute: function(prop,attribute) {
			
			//attribute.type=prop.type;
			this.copy("description","description",prop,attribute);
			this.copy("title","label",prop,attribute);
			this.copy("required","required",prop,attribute);
			this.copy("readonly","readonly",prop,attribute);
			this.copy("enum","values",prop,attribute);
			if (prop.type=="object") {
				var types = this.convertObjectProp(prop);
				attribute.type="object";
				attribute.validTypes=types;
			}else if (prop.type=="array") {
				attribute.array=true;
				if (prop.items.type=="object") {
					attribute.type="object";
					var types = this.convertObjectProp(prop.items);
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
		convertObjectProp: function(prop) {
				if (prop.oneOf) {
					return this.convertTypes(prop.oneOf);
				}else	if (prop.properties) {
					return [this.convert(prop)];
				}else{
					throw new Error("cannot only convert objects with oneOf");
				}
		},
		convertTypes: function(schemas) {
			return array.map(schemas,lang.hitch(this,"convert"),this);
		},
		convert: function(schema,meta) {
			schema=ref.resolveJson(schema);
			meta={};
			meta.attributes=[];
			//return  meta;
			for (var key in schema.properties) {
				// "__parent" is added by dojox/json/ref
				if (key!="__parent") {
					var attribute={};
					attribute.code=key;
					var prop = schema.properties[key];
					meta.attributes.push(attribute);
					this.convertAttribute(prop,attribute);
				}
			}		
			return meta;
		}
	}

	return lang.hitch(convert,"convert");
});

