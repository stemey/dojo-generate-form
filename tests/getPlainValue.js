define(["doh/runner","gform/getPlainValue"], function(doh,getPlainValue){

    doh.register("gform-getPlainValue", [
      function testPlainValue(){
        var value=getPlainValue({__type:"value",value:"stefan"});
				doh.assertEqual("stefan",value);
      },
      function testNull(){
        var value=getPlainValue(null);
				doh.assertEqual(null,value);
      },
      function testPrimitiveArray(){
        var plain=getPlainValue([{__type:"value",value:"stefan"},{__type:"value",value:"tim"}]);
				doh.assertEqual(plain[0],"stefan");
      },
      function testComplexArray(){
        var plain=getPlainValue([{firstname:{__type:"value",value:"stefan"}},{firstname:{__type:"value",value:"tim"}}]);
				doh.assertEqual(plain[1].firstname,"tim");
      }
    ]);

});

