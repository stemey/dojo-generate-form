define(["doh/runner","gform/getStateful","gform/getPlainValue","gform/updateStateful"], function(doh,getStateful,getPlainValue,updateStateful){

    doh.register("gform", [
      function testValue(){
        var stateful=getStateful("stefan");
				updateStateful("willi",stateful)
				doh.assertEqual(getPlainValue(stateful),"willi");
      },
      function testObject(){
        var stateful=getStateful({name:"stefan",age:1});
				var nameHandle=stateful.value.name;
				updateStateful({name:"willi"},stateful)
				doh.assertEqual(getPlainValue(stateful).name,"willi");
				doh.assertEqual("undefined",typeof getPlainValue(stateful).age);
				doh.assertEqual(nameHandle,stateful.value.name);
      },
      function testObjectFromNull(){
        var stateful=getStateful(null);
				updateStateful({name:"willi"},stateful)
				doh.assertEqual(getPlainValue(stateful).name,"willi");
      },
      function testPrimitiveArray(){
        var stateful=getStateful(["stefan","tim"]);
				var arrayHandle=stateful.value;
				updateStateful(["willi"],stateful)
				doh.assertEqual(getPlainValue(stateful)[0],"willi");
				doh.assertEqual(stateful.value,arrayHandle);
      },
      function testPrimitiveArrayFromNull(){
        var stateful=getStateful(null);
				updateStateful(["willi"],stateful)
				doh.assertEqual(getPlainValue(stateful)[0],"willi");
      },
    ]);

});

