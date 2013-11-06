define(["doh/runner","dojo/_base/lang", "dojo/Stateful", "gform/model/SingleObject", "gform/model/PrimitiveModel", "gform/model/SingleObject", "gform/model/MapModel"], function(doh, lang, Stateful, SingleObject, PrimitiveModel, SingleObject, MapModel){

	

		var assertEqual = function(expected, actual) {
			doh.assertEqual(dojo.toJson(expected), dojo.toJson(actual));
		}

		var elementFactory = function(value) {
			var element = new PrimitiveModel(); 
			var key = new PrimitiveModel(); 
			var attributes={"x":element, "key":key};
			var model = new SingleObject({attributes:attributes});
			model.update(value);
			return model;
		};
		var am = new MapModel({keyProperty:"key", elementFactory:elementFactory});

    doh.register("MapModel", [
      function testValue(){
				am.update({"x":{"x":4}});	
				var plainValue = am.getPlainValue();
				assertEqual({"x":{"x":4}}, plainValue);
      },
			function testNull(){
				am.update(null);	
				var plainValue = am.getPlainValue();
				assertEqual({}, plainValue);
      },
			function testDefaults(){
				am.update({});	
				am.put("z", {"x":9});
				var plainValue = am.getPlainValue();
				assertEqual({"z": {"x":9}}, plainValue);
      },
			function testState(){
				assertEqual(0, am.errorCount);
				am.getModelByKey("z").set("state","Error");	
				assertEqual(1, am.errorCount);
      },
			function testChanged(){
				am.getModelByKey("z").update({"x":8});	
				assertEqual(1, am.changedCount);
      }
    ]);

     
});

