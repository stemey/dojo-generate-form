define(["doh/runner","gform/schema/schemaGenerator","gform/createStandardEditorFactory"], function(doh,schemaGenerator,createStandardEditorFactory){

	


    doh.register("gform-schemaGenerator", [
      function testSchema(){
				var ef = createStandardEditorFactory();
				var schema = schemaGenerator.generate(ef);
				console.log(dojo.toJson(schema,true));
      }
    ]);

});




