define(["doh/runner","gform/schema/schemaGenerator","gform/createStandardEditorFactory","json-schema/lib/validate","dojo/text!json-schema/draft-03/schema"], function(doh,schemaGenerator,createStandardEditorFactory,validate,schemaSchema){

	
	function addSchemaTest(attributeFactory,tests) {
		var safSchema=attributeFactory.getSchema();
		var test= {
			name:"testSchema-"+safSchema.id,
			runTest:function() { 
				var instance=dojo.fromJson(safSchema.example);
				var result = validate(instance,safSchema);
				if (!result.valid) {
					console.log(dojo.toJson(result,true));
					console.log(dojo.toJson(instance,true));
					console.log(dojo.toJson(safSchema,true));
				}
				doh.assertTrue(result.valid);		
				}
			}
		tests.push(test);
	}

    var tests= [
      function testSchema(){
				var ef = createStandardEditorFactory();
				var schema = schemaGenerator.generate(ef);
				//console.log(dojo.toJson(schema,true));
      },
      function validateSchema(){
				var ef = createStandardEditorFactory();
				var schema = schemaGenerator.generate(ef);
				var result =validate(schema,dojo.fromJson(schemaSchema));
				console.log("found "+result.errors.length+" errors in schema "+schema.id);
				for (var key in result.errors) {
					console.log(dojo.toJson(result.errors[key],true));
				}
				doh.assertEqual(result.errors.length,0);
      }
    ];

	var ef = createStandardEditorFactory();
	for (var key in ef.getAttributeFactories()) {
		var saf = ef.getAttributeFactories()[key];
		if (saf.getSchema) {
			addSchemaTest(saf,tests);
		};
	}


  doh.register("gform-schemaGenerator",tests);



});



