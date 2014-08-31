define(["doh/runner","gform/util/restHelper"], function(doh, restHelper){

    doh.register("gform-restHelper", [
      function compose(){
				var url = restHelper.compose("/state/x",1);
				doh.assertEqual("/state/x/1", url);
      }
    ]);

});

