define(["doh/runner","gform/schema/refresolve","gform/convertSchema","dojo/text!./meta/contacts_schema.json"], function(doh,refresolve,convertSchema,contactsSchemaJson){

	

	var schemaWithRef = {
		definitions:[
			{id:"cars",properties:{elements:{type:"array",items:{type:{"$ref":"car"}}}}}
		],
		id:"car",
		properties:{sisters:{type:{"$ref":"cars"}}}
	};

	var simpleSchema = {
		id:"car",
		properties:{
			sisters:{type:"array",items:{type:"string"}},
			brother:{type:"string"},
			address:{type:{properties:{city:{type:"string"}}}},
			emails:{type:"array",items:{type:{properties:{email:{type:"string"}}}}}
			}
	};
	var stringSchema = {
		id:"car",
		properties:{
			brother:{type:"string"}
		}
	};
	var stringArraySchema = {
		id:"stringArray",
		properties:{
			sisters:{type:"array",items:{type:"string"}},
			}
	};
	var complexSchema = {
		id:"car",
		properties:{
			address:{type:{properties:{city:{type:"string"}}}},
			}
	};
	var complexArraySchema = {
		id:"car",
		properties:{
			emails:{type:"array",items:{type:{properties:{email:{type:"string"}}}}}
			}
	};

	var schemas={};
	var index={};
	
	var loader=function(s) {
			console.log("load "+s);
	}
  //console.log(dojo.toJson(contactsSchema,true));


    doh.register("gform-convertSchema", [
      function testContactsSchema(){
				var contactsSchema = dojo.fromJson(contactsSchemaJson);
				refresolve(contactsSchema);
				var meta = convertSchema(contactsSchema);
				//console.log(dojo.toJson(meta,true));({})
      },
      function testSchemaWithCircularRef(){
				refresolve(schemaWithRef);
				var meta = convertSchema(schemaWithRef);
				
      },
      function testStringSchema(){
				refresolve(stringSchema);
				var meta = convertSchema(stringSchema);
				doh.assertEqual("string",meta.attributes[0].type)				
				doh.assertFalse(meta.attributes[0].array)	
      },
      function testStringArraySchema(){
				refresolve(stringArraySchema);
				var meta = convertSchema(stringArraySchema);
				doh.assertEqual("string",meta.attributes[0].type)				
				doh.assertTrue(meta.attributes[0].array)				
			},
      function testComplexSchema(){
				refresolve(complexSchema);
				var meta = convertSchema(complexSchema);

				doh.assertEqual("object",meta.attributes[0].type)				
				doh.assertEqual(1,meta.attributes[0].validTypes.length)	
				doh.assertEqual("string",meta.attributes[0].validTypes[0].attributes[0].type)	
			}	,
      function testComplexArraySchema(){
				refresolve(complexArraySchema);
				var meta = convertSchema(complexArraySchema);

				doh.assertEqual("object",meta.attributes[0].type)				
				doh.assertTrue(true,meta.attributes[0].array)				
				doh.assertEqual(1,meta.attributes[0].validTypes.length)	
				doh.assertEqual("string",meta.attributes[0].validTypes[0].attributes[0].type)
			}		
    ]);

		function findAttribute(schem, code) {
			for (var key in schema.attributes) {
				var attribute=schema.attributes[key];
				if (attribute.code==code) {
					return attribute;
				}		
			}
			throw new Error("attribute "+code+" not found");
		}

});




