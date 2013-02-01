define(["doh/runner","gform/getPlainValue","gform/getStateful"], function(doh,getPlainValue,getStateful){

    doh.register("gform-getPlainValue", [
      function testPlainValue(){
				var stateful=getStateful("stefan");
        var value=getPlainValue(stateful);
				doh.assertEqual(value,"stefan");
      },
      function testNull(){
        var value=getPlainValue(null);
				doh.assertEqual(value,null);
      },
      function testPrimitiveArray(){
				var stateful=getStateful(["stefan","tim"]);
        var plain=getPlainValue(stateful);
				doh.assertEqual("stefan",plain[0]);
      },
      function testComplexArray(){
				var stateful=getStateful([{name:"stefan"},{name:"tim"}]);
        var plain=getPlainValue(stateful);
				doh.assertEqual("tim",plain[1].name);
      },
      function testIgnore(){
				var stateful=getStateful({name:"stefan"});
				stateful.value.name.ignore=true
        var plain=getPlainValue(stateful);
				doh.assertEqual("undefined",typeof plain.name);
      },
      function testIgnoreArrayElement(){
				var stateful=getStateful([{name:"stefan"}]);
				stateful.value[0].ignore=true
        var plain=getPlainValue(stateful);
				doh.assertEqual("undefined",typeof plain[0]);
      }
    ]);

});

