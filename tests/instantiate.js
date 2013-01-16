define(["doh/runner","gform/instantiate","./Test1","./Test2"], function(doh,instantiate,Test1,Test2){
    doh.register("gform-instantiate", [
      function testPlainProperty(){
				
        var json={__type:"gform.tests.Test1",name:"stefan"};
				var model=instantiate(json);
				doh.assertEqual(true,model.isTest1());
				doh.assertEqual("gform.tests.Test1",model.declaredClass);
      },
      function testComplexProperty(){
				
        var json={__type:"gform.tests.Test1",test2:{__type:"gform.tests.Test2",name:"stefan"}};
				var model=instantiate(json);
				doh.assertEqual(true,model.test2.isTest2());
				doh.assertEqual("gform.tests.Test2",model.test2.declaredClass);
      },
      function testComplexPropertyWithoutType(){
				
        var json={__type:"gform.tests.Test1",test2:{__type:"unknownType",name:"stefan"}};
				var model=instantiate(json);
				doh.assertEqual("stefan",model.test2.name);
				doh.assertEqual(undefined,model.test2.declaredClass);
      },
      function testComplexArray(){
				
        var json={__type:"gform.tests.Test1",tests:[{__type:"gform.tests.Test2",name:"stefan"}]};
				var model=instantiate(json);
				doh.assertEqual(true,model.tests[0].isTest2());
				doh.assertEqual("gform.tests.Test2",model.tests[0].declaredClass);
      }
    ]);

});

