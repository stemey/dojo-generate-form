define(["doh/runner","gform/getPlainValue","gform/updateModelHandle"], function(doh,getPlainValue,updateModelHandle){

		var getStateful = function(object) {
			var mh = updateModelHandle.createMeta();
			mh.set("value",object);
			return mh;
		}

    doh.register("gform-getPlainValue", [
      function testPlainValue(){
				var stateful=getStateful("stefan");
        var value=getPlainValue(stateful);
				doh.assertEqual(value,"stefan");
      },
      function testIgnore(){
				var stateful=getStateful("stefan");
				stateful.ignore=true;
        var plain=getPlainValue(stateful);
				doh.assertEqual("undefined",typeof plain);
      }
    ]);

});

