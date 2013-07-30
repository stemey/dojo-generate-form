define(["doh/runner","gform/utils/restHelper"], function(doh, restHelper){

    doh.register("gform-restHelper", [
      function parseId(){
				var restUrl = restHelper.decompose("/state/x/1");
				doh.assertEqual("1", restUrl.id);
				doh.assertEqual("/state/x", restUrl.url);
      },
      function parseUrl(){
				var url = restHelper.createUrl("/state/x",1);
				doh.assertEqual("/state/x/1", url);
      }
    ]);

});

