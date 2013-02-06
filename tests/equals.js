define(["doh/runner","gform/equals","gform/getStateful"], function(doh,equals,getStateful){

    doh.register("gform-equals", [
      function testValue(){
				var stateful1=getStateful("stefan");
				stateful1.set("metadata","xx");
        var stateful2=getStateful("stefan");
        doh.assertTrue(equals(stateful1,stateful2));
      },
      function testNull(){
				var stateful1=getStateful(null);
				stateful1.set("metadata","xx");
        var stateful2=getStateful(null);
        doh.assertTrue(equals(stateful1,stateful2));
      },
      function testMeta(){
				var stateful1={__type:"meta",value:1,meta:"d"};
				var stateful2={__type:"meta",value:1};
        doh.assertTrue(equals(stateful1,stateful2));
      },
      function testArray(){
				var stateful1=getStateful(["1"]);
				stateful1.set("metadata","xx");
        var stateful2=getStateful(["1"]);
        doh.assertTrue(equals(stateful1,stateful2));
      }
    ]);

});

