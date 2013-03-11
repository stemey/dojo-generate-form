define(["doh/runner","dojo/_base/lang","gform/schema/refresolve"], function(doh,lang,refresolve){

		var schema=					
				{
						defs: [
							{id:"mercedes",price:"expensive"},
							{id:"vw",price:"medium"},
						],
						mycar: {$ref:"mercedes"},
						theircars: [{$ref:"mercedes"},{$ref:"vw"}],
						
			}
	
    doh.register("gform-refresolve", [
      function testValue(){
				refresolve(schema);
        doh.assertEqual("expensive",schema.mycar.price);
        doh.assertEqual("medium",schema.theircars[1].price);
      }
    ]);

});

