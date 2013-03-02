define(["doh/runner","gform/equals","gform/updateModelHandle"], function(doh,equals,updateModelHandle){

    doh.register("gform-equals", [
      function testMeta(){
				var stateful1={__type:"meta",value:1,meta:"d"};
				var stateful2={__type:"meta",value:1};
        doh.assertTrue(equals(stateful1,stateful2));
      }
    ]);

});

