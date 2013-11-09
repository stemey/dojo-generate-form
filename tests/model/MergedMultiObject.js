define(["doh/runner","dojo/_base/lang", "dojo/Stateful", "gform/model/SingleObject", "gform/model/MergedMultiObject", "gform/model/PrimitiveModel"], function(doh, lang, Stateful, SingleObject, MergedMultiObject, PrimitiveModel){

		var type=					
				{
					type: "multi-object",
					typeProperty: "type",
					groups: 
						[
							{
								code: "type1",
								attributes:
									[
										{code:"type",type:"string"},
										{code:"stringP",type:"string"},
										{code:"booleanP",type:"boolean"}
									]
							},
							{
								code: "type2",
								attributes:
									[
										{code:"type",type:"string"},
										{code:"booleanP",type:"boolean"},
										{code:"numberP",type:"number"}
									]
							}
						]
					};
		var object1= {
				type: "type1",
				stringP:"hallo",
				booleanP:true
			};
		var object2= {
				type: "type2",
				booleanP:true,
				numberP:3
			};
	

		var assertEqual = function(expected, actual) {
			doh.assertEqual(dojo.toJson(expected), dojo.toJson(actual));
		}


		var mo = MergedMultiObject.create(type, function() {return new PrimitiveModel()});


    doh.register("MultiObject", [
      function testValue(){
				mo.update(object1);	
				var plainValue = mo.getPlainValue();
				assertEqual(object1, plainValue);
      },
			function testNull(){
				mo.update(null);	
				var plainValue = mo.getPlainValue();
				assertEqual(null, plainValue);
      },
			function testSwitchType(){
				mo.update(object2);
				mo.update(object1);
				mo.set("currentTypeCode", "type2");	
				var plainValue = mo.getPlainValue(mo);
				assertEqual(true, plainValue.booleanP);
				assertEqual(3, plainValue.numberP);
				assertEqual("type2", plainValue.type);
      }
    ]);

     
});

