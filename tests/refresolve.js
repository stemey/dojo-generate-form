define(["doh/runner","dojo/_base/lang","gform/util/refresolve"], function(doh,lang,refresolve){

		var schema=					
				{
						defs: [
							{id:"mercedes",price:"expensive"},
							{id:"vw",price:"medium"},
						],
						somethingelse:"text",
						mycar: {$ref:"mercedes"},
						theircars: [{$ref:"mercedes"},{$ref:"vw"}],
						
			}

		var schemaWithExternalRef=					
				{
						car: {$ref:"./meta/externalSchema.json"},
						
			}
	
    doh.register("gform-refresolve", [
      function testById(){
				refresolve(schema);
        doh.assertEqual("expensive",schema.mycar.price);
        doh.assertEqual("medium",schema.theircars[1].price);
			},
      function testByUrl(){
				var promise = refresolve(schemaWithExternalRef);
				promise.then(function() {
       	 doh.assertEqual("object",schemaWithExternalRef.car.type);
				},function(e) {
					doh.fail("error loading external schema ",e);
				});
      }
    ]);

});

