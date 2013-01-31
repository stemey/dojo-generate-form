define(["doh/runner","gform/getStateful"], function(doh,getStateful){

    doh.register("gform", [
      function testPlainValue(){
        var stateful=getStateful({name:"stefan"});
				doh.assertEqual(stateful.value.name.value,"stefan");
      },
      function testPrimitiveArray(){
        var stateful=getStateful({name:["stefan","tim"]});
				doh.assertEqual(stateful.value.name.value.get(0).value,"stefan");
      },
      function testComplexPrimitiveArray(){
        var stateful=getStateful({name:[{firstname:"stefan"},{firstname:"tim"}]});
				doh.assertEqual(stateful.value.name.value.get(1).value.firstname.value,"tim");
      },
      function testNullValue(){
        var stateful=getStateful(null);
				doh.assertEqual(stateful.value,null);
      },
      function testArrayValue(){
        var stateful=getStateful(["üüü"]);
				doh.assertEqual("üüü",stateful.value.get(0).value);
      }
    ]);

});

