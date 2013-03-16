define(["doh/runner","gform/schema/refresolve","gform/convertSchema","dojo/text!./meta/contacts_schema.json"], function(doh,refresolve,convertSchema,contactsSchemaJson){

	

	var schemaWithRef = {
		definitions:[
			{id:"cars",properties:{elements:{type:"array",items:{type:"object",oneOf:[{"$ref":"car"}]}}}}
		],
		id:"car",
		properties:{sisters:{type:"object",oneOf:[{"$ref":"cars"}]}}
	};

	var schemas={};
	var index={};
	
	var loader=function(s) {
			console.log("load "+s);
	}
  var contactsSchema = dojo.fromJson(contactsSchemaJson);
	//console.log(dojo.toJson(contactsSchema,true));


    doh.register("gform-convertSchema", [
      function testSimpleSchema(){
				var meta = convertSchema(contactsSchema);
				console.log(dojo.toJson(meta,true));({})
      },
      function testSchemaWithCircularRef(){
				refresolve(schemaWithRef);
				var meta = convertSchema(schemaWithRef);
				var x=0;
				//console.log(dojo.toJson(meta,true));({})
      }
    ]);

});




