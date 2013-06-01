define([ "dojo/_base/lang", "./JsonSchemaConverter"
], function(lang, Converter) {
// module:
//		gform/convertSchema
// summary:
//		The main export is a function to convert a json schema to a gform schema.

	var converter =new Converter
	var convert = function(schema) {
		// summary:
		//		convert json schema to gform schema
		// jsonSchema: Object
		// returns: Object
		return converter.convert(schema);
	}	
	return convert;
});

