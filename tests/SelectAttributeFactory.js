define(["doh/runner","gform/primitive/SelectAttributeFactory","json-schema/lib/validate"], function(doh,SelectAttributeFactory,validate){

	


    doh.register("gform-primitive-SelectAttributeFactory", [
      function testValidate(){
				var saf = new SelectAttributeFactory();
				var safSchema=saf.getSchema();
				var instance=dojo.fromJson(safSchema.example);
				var result = validate(instance,safSchema);
				if (!result.valid) {
					console.log(dojo.toJson(result,true));
				}
				console.log(dojo.toJson(safSchema,true));
				doh.assertTrue(result.valid);		
      }
    ]);

});




