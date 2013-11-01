define(["doh/runner","dojo/_base/lang", "dojo/Stateful", "gform/model/SingleObject", "gform/model/PrimitiveModel", "gform/model/ArrayModel"], function(doh, lang, Stateful, SingleObject, PrimitiveModel,ArrayModel){

		var type=	{type:"string"};
	

		var assertEqual = function(expected, actual) {
			doh.assertEqual(dojo.toJson(expected), dojo.toJson(actual));
		}

		var elementFactory = function(value) {
			var model = new PrimitiveModel(type);
			model.update(value);
			return model;
		};
		var am = new ArrayModel({elementFactory:elementFactory});

    doh.register("ArrayModel", [
      function testValue(){
				am.update(["a","b"]);	
				var plainValue = am.getPlainValue();
				assertEqual(["a","b"], plainValue);
      },
			function testNull(){
				am.update(null);	
				var plainValue = am.getPlainValue();
				assertEqual([], plainValue);
      },
			function testDefaults(){
				am.update(["a","b"]);	
				am.push("x");
				var plainValue = am.getPlainValue();
				assertEqual(["a","b","x"], plainValue);
      },
			function testState(){
				assertEqual(0, am.errorCount);
				am.getModelByIndex(1).set("state","Error");	
				assertEqual(1, am.errorCount);
      },
			function testChanged(){
				am.getModelByIndex(1).update("v");	
				assertEqual(1, am.changedCount);
      }
    ]);

     
});

