define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
], function(array, lang, declare, getPlainValue, equals) {


	var convert = {
		copy: function(propSource,propTarget,prop,attribute) {
			var value = prop[propSource];
			if (value) {
				attribute[propTarget]=value;
			}
		},
		convertAttribute: function(prop,attribute) {
			attribute.type=prop.type;
			this.copy("description","description",prop,attribute);
			this.copy("label","label",prop,attribute);
			var optional = prop["optional"];
			if (optional) {
				attribute["required"]=!optional;
			}
			this.copy("readonly","readonly",prop,attribute);
			this.copy("options","values",prop,attribute);
			if (prop.type=="object") {
				var propertyType=this.convert(prop);
				attribute.validTypes=[];
				attribute.validTypes.push(propertyType);
			}else if (prop.type=="array") {
				attribute.array=true;
				if (prop.items.type=="object") {
					var propertyType = this.convert(prop.items);
					attribute.validTypes=[];
					attribute.validTypes.push(propertyType);
				} else if (prop.items.type="array") {
					throw new Error("cannot convert array of arrays");
				}else{
					attribute.type=prop.items.type;
				}
			}
		},
		convert: function(schema,meta) {
			meta={};
			meta.attributes=[];
			for (var key in schema.properties) {
				var attribute={};
				attribute.code=key;
				meta.attributes.push(attribute);
				var prop = schema.properties[key];
				this.convertAttribute(prop,attribute);
			}		
			return meta;
		}
	}

	return lang.hitch(convert,"convert");
});

