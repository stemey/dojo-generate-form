define(["doh/runner","gform/getStateful"], function(doh,getStateful){

    doh.register("gform", [
      function testPlainValue(){
        var stateful=getStateful({name:"stefan"});
				doh.assertEqual(stateful.name.value,"stefan");
      },
      function testPrimitiveArray(){
        var stateful=getStateful({name:["stefan","tim"]});
				doh.assertEqual(stateful.name.get(0).value,"stefan");
      },
      function testComplexPrimitiveArray(){
        var stateful=getStateful({name:[{firstname:"stefan"},{firstname:"tim"}]});
				doh.assertEqual(stateful.name.get(1).firstname.value,"tim");
      },
      function testNullValue(){
        var stateful=getStateful(null);
				doh.assertEqual(stateful.value,null);
      }
    ]);

});

