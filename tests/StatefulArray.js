define([
	"doh",
	"dojox/mvc/StatefulArray"
], function(doh, StatefulArray){
	doh.register("dojox.mvc.tests.StatefulArray", [
		{
			name: "splice",
			runTest: function(){
				var dfd = new doh.Deferred(),
				 a = new StatefulArray([0, 1, 2, 3]);

				a.splice(0,0,3);

				doh.is([3, 0, 1 ,2, 3], a, "The array should end up with 0, 100, 101, 3");

				return dfd;
			},
			tearDown: function(){
				this.h && this.h.remove();
			}
		},
		function slice(){
			var a = new StatefulArray([0, 1, 2, 3]);
			doh.is([1, 2], a.slice(-3, 3), "Index 1 and index 2 should be returned");
			doh.is([1], a.slice(-3, -2), "Index 1 should be returned");
		}
	]);
});
