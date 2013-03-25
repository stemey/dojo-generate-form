define(["doh/runner","gform/schema/schemaGenerator","gform/schema/refresolve","gform/createStandardEditorFactory","json-schema/lib/validate","dojo/text!json-schema/draft-03/schema"], function(doh,schemaGenerator, refresolve, createStandardEditorFactory,validate,schemaSchema){

	
	function addSchemaTest(schema,tests) {
		var test= {
			name:"testSchema-"+schema.id,
			runTest:function() { 
				var instance=dojo.fromJson(schema.example);
				var result = validate(instance,schema);
				if (!result.valid) {
					console.log(dojo.toJson(result,true));
					console.log(dojo.toJson(instance,true));
					//console.log(dojo.toJson(schema,true));
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
				refresolve(schema);
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
	var schema = schemaGenerator.generate(ef);
	refresolve(schema);	
	for (var key in schema.definitions) {
		var schemaDef = schema.definitions[key];
		// onyl add attribute schemas
		if (schemaDef.id && schemaDef.example ) {
			addSchemaTest(schemaDef,tests);
		}
	}


  doh.register("gform-schemaGenerator",tests);



});



