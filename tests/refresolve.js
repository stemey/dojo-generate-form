define(["doh/runner", "gform/util/refresolve"], function (doh, refresolve) {

	var schema =
	{
		defs: [
			{id: "mercedes", price: "expensive"},
			{id: "vw", price: "medium"},
		],
		somethingelse: "text",
		mycar: {$ref: "mercedes"},
		theircars: [
			{$ref: "mercedes"},
			{$ref: "vw"}
		]

	};

	var schemaWithExternalRef =
	{
		car: {$ref: "./meta/externalSchema.json"},
		carx: {$ref: "./meta/externalSchema.json"}

	};

	doh.register("gform-refresolve", [
		function testById() {
			refresolve(schema);
			doh.assertEqual("expensive", schema.mycar.price);
			doh.assertEqual("medium", schema.theircars[1].price);
		},
		function testByUrl() {
			var promise = refresolve(schemaWithExternalRef);
			promise.then(function () {
				doh.assertEqual("object", schemaWithExternalRef.car.type);
				// TODO need to add more than one listener to a reference :doh.assertTrue(schemaWithExternalRef.car === schemaWithExternalRef.carx);
			}, function (e) {
				doh.fail("error loading external schema ", e);
			});
		}
	]);

});

