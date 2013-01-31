define([
	"dojo/_base/array",
	"dojo/_base/lang"
],  function(array, lang){
			return function(validTypes) {
				var combinedAttributes = [];
				var addedAttributes={};
				array.forEach(validTypes, function(type) {
					array.forEach(type.attributes, function(attribute) {
						if (!addedAttributes[attribute.code]) {
							attribute.types=[type.code];
							combinedAttributes.push(attribute);
							addedAttributes[attribute.code]=attribute;
						}else{
							addedAttributes[attribute.code].types.push(type.code);
						}
					}, this);
				}, this);
				return combinedAttributes;
			}
	}
);
