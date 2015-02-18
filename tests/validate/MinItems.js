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
	model.init();


	doh.register("MinItems", [
		function testValid() {
			model.update(["1", "2"]);
            model.validate(true);
			doh.assertEqual(0, model.errorCount);
		},
		function testInvalid() {
			model.update(["1"]);
            model.validate(true);
			doh.assertEqual(1, model.errorCount);
			doh.assertTrue(model.message!="");
		}
	]);


});

