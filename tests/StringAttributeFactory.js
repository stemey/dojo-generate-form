define(["doh/runner","gform/primitive/StringAttributeFactory","dojox/json/schema"], function(doh,StringAttributeFactory,schema){

	


    doh.register("gform-primitive-StringAttributeFactory", [
      function testValidate(){
				var saf = new StringAttributeFactory();
				var safSchema=saf.getSchema();
				var instance={code:"text",type:"string"};
				var result = schema.validate(instance,safSchema);
				doh.assertTrue(result.valid);		
      }
    ]);

});




