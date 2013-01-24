define(["doh/runner","dojo/Stateful","gform/copyProperties"], function(doh,Stateful,copyProperties){

    doh.register("gform/copyProperties", [
      function test(){
        var value=new Stateful({name:"stefan"});
        var target=new Stateful({name:"stefan2"});
				copyProperties(value,target);
				doh.assertEqual(target.name,"stefan");
      },
      function testNull(){
       var value=new Stateful({name:null});
        var target=new Stateful({name:"stefan2"});
				copyProperties(value,target);
				doh.assertEqual(target.name,null);
       }
    ]);

});

