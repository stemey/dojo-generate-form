global["document"]={compatMode:"",querySelectorAll:function(){return null}};
document.createElement= function(){return {}};
global["window"]={"document":document};
define(["doh/runner","app/editor/AttributeFactoryFinder"], function(doh,af){

    doh.register("MyTests", [
      function assertTrueTest(){
        doh.assertTrue(true);
        doh.assertTrue(1);
        doh.assertTrue(!false);

      },
      {
        name: "thingerTest",
        setUp: function(){
		//global["document"]={};
        },
        runTest: function(){
	af.getFactory({});
          doh.assertEqual("blah", this.thingerToTest.blahProp);
          doh.assertFalse(this.thingerToTest.falseProp);
          // ...
        },
        tearDown: function(){
        }
      },
      // ...
    ]);

});

