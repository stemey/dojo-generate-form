define([
	"doh/runner", "gform/model/transformer/GeneralTransformer"], function (doh, GeneralTransformer) {

	var transformer = new GeneralTransformer();
	doh.register("GeneralTransformer", [
		function testOut() {
			var result = transformer.out({x:3,y:null,z:undefined});
			doh.assertEqual(3, result.x);
			doh.assertEqual(false, "y" in result);
			doh.assertEqual(false, "z" in result);
		},
		function testIn() {
			var result = transformer.in({x:3,y:null,z:undefined});
			doh.assertEqual(3, result.x);
			doh.assertEqual(true, result.y===null);
			doh.assertEqual(true, typeof result.z === "undefined");
		}
	]);


});

