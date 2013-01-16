define(["doh/runner","gform/getPlainValue"], function(doh,getStateful){

    doh.register("gform-getPlainValue", [
      function testPlainValue(){
        var value=getPlainValue({value:"stefan"});
				doh.assertEqual("stefan",value);
      },
      function testPrimitiveArray(){
        var plain=getPlainValue([{value:"stefan"},{value:"tim"}]});
				doh.assertEqual(plain[0],"stefan");
      },
      function testComplexArray(){
        var plain=getPlainValue([{firstname:{value:"stefan"}},{firstname:{value:"tim"}}]});
				doh.assertEqual(plain[1].firstname,"tim");
      }
    ]);

});

