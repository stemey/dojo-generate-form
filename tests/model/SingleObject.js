define(["doh/runner","dojo/_base/lang", "dojo/Stateful", "gform/model/SingleObject", "gform/model/PrimitiveModel"], function(doh, lang, Stateful, SingleObject, PrimitiveModel){

		var type=					
				{
					type: "single-object",
						attributes:
							[
								{code:"stringP",type:"string"},
								{code:"booleanP",type:"boolean"},
								{code:"numberP",type:"number"}
							]
					}
		var object= {
				stringP:"hallo",
				booleanP:true,
				numberP:23
			}
	

		var assertEqual = function(expected, actual) {
			doh.assertEqual(dojo.toJson(expected), dojo.toJson(actual));
		}

		var attributes={};
		type.attributes.forEach(function(attribute) {
			attributes[attribute.code] = new PrimitiveModel(attribute);
		});
		var so = new SingleObject({attributes:attributes});

    doh.register("SingleObject", [
      function testValue(){
				so.update(object);	
				var plainValue = so.getPlainValue(so);
				assertEqual(object, plainValue);
      },
			function testNull(){
				so.update(null);	
				var plainValue = so.getPlainValue(so);
				assertEqual(null, plainValue);
      },
			function testDefaults(){
				so.update({});	
				var plainValue = so.getPlainValue(so);
				assertEqual({stringP: null, booleanP: null, numberP:null}, plainValue);
      },
			function testResetMetaRecursively(){
				so.getAttribute("stringP").set("state","Error");	
				so.set("state","Error");	
				assertEqual(2, so.errorCount);
				so.resetMetaRecursively();
				assertEqual(0, so.errorCount);
      },
			function testState(){
				assertEqual(0, so.errorCount);
				so.getAttribute("stringP").set("state","Error");	
				assertEqual(1, so.errorCount);
      },
			function testChanged(){
				so.setValue("stringP", "x");	
				assertEqual(1, so.changedCount);
      }
    ]);

     
});

