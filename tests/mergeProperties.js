define(["doh/runner","dojo/Stateful","gform/mergeProperties"], function(doh,Stateful,mergeProperties){

    doh.register("gform/mergeProperties", [
      function test(){
        var value=new Stateful({namea:"stefan",common:"xx"});
        var target=new Stateful({nameb:"stefan2",common:"yy"});
				mergeProperties(value,target);
				doh.assertEqual("stefan",target.namea);
				doh.assertEqual("yy",target.common);
				doh.assertEqual(typeof target.nameb,"undefined");
      }
    ]);

});

