define([
	"../../model/PrimitiveModel",
	"../../model/ArrayModel",
	"../../validate/MinItems",
	"doh/runner"
], function (PrimitiveModel, ArrayModel, MinItems, doh) {

	var maxItems = MinItems(2);
	var ef = function (value) {
		var model = new PrimitiveModel();
		model.update(value);
		return model;
	};
	var model = new ArrayModel({elementFactory: ef, validators: [maxItems]});


	doh.register("MinItems", [
		function testValid() {
			model.update(["1", "2"]);
			doh.assertEqual(0, model.errorCount);
		},
		function testInvalid() {
			model.update(["1"]);
			doh.assertEqual(1, model.errorCount);
			doh.assertTrue(model.message!="");
		}
	]);


});

