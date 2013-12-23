define([
	"../../model/PrimitiveModel",
	"../../model/ArrayModel",
	"../../validate/MaxItems",
	"doh/runner"], function (PrimitiveModel, ArrayModel, MaxItems, doh) {

	var maxItems = MaxItems(3);
	var ef = function (value) {
		var model = new PrimitiveModel();
		model.update(value);
		return model;
	};
	var model = new ArrayModel({elementFactory: ef, validators: [maxItems]});
	model.update(["1", "2", "3"]);


	doh.register("MaxItems", [
		function testValid() {
			model.update(["1", "2", "3"]);
			doh.assertEqual(0, model.errorCount);
		},
		function testInvalid() {
			model.update(["1", "2", "3", "4"]);
			doh.assertEqual(1, model.errorCount);
			doh.assertTrue(model.message!="");
		}
	]);


});

