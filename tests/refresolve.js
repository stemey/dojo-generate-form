define(['dojo/_base/declare',
	'dojo/_base/Deferred',
	"doh/runner", "gform/util/Resolver"], function (declare, Deferred, doh, Resolver) {

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

	var LocalResolver = declare([Resolver], {
		constructor: function () {
			this.p = {};
		},
		p: null,
		_load: function (url) {
			var d = new Deferred();
			this.p[url] = d;
			return d;

		}
	});

	var schemaWithExternalRef =
	{
		car: {$ref: "./meta/externalSchema.json"},
		carx: {$ref: "./meta/externalSchema.json"}

	};

	var schemaWithTranform =
	{
		car: {$ref: "./transformed.json"}
	};

	var man =
	{
		car: {$ref: "./meta/car.json"}

	};
	var car =
	{
		engine: {$ref: "engine.json"}

	};
	var engine =
	{
		creator: {$ref: "../man.json"}

	};

	doh.register("gform-refresolve", [
		function testById() {
			var resolver = new LocalResolver();
			resolver.resolve(schema, "");
			doh.assertEqual("expensive", schema.mycar.price);
			doh.assertEqual("medium", schema.theircars[1].price);
		},
		function testByIdI() {
			var resolver = new LocalResolver();
			var refs = resolver.resolveInternally(schema, "");
			doh.assertEqual("expensive", schema.mycar.price);
			doh.assertEqual("medium", schema.theircars[1].price);
		},
		function testByUrl() {
			var resolver = new LocalResolver();
			var refs = resolver.resolveInternally(schemaWithExternalRef, "");
			doh.assertEqual(2, refs.length);
			//doh.assertEqual(0, resolver.values);
			var p = resolver.finish(refs, "");
			resolver.p["meta/externalSchema.json"].resolve("test");
			doh.assertEqual(true, p.isResolved());
			resolver.callSetters();
			doh.assertEqual("test", schemaWithExternalRef.car);


		},
		function testByUrlTransform() {
			var resolver = new LocalResolver();
			resolver.transformations["transformed.json"] = {
				url: "original.json",
				execute: function (o) {
					return {d: o};
				}
			};
			var p = resolver.resolve(schemaWithTranform, "");
			doh.assertEqual(false, p.isResolved());
			var original = {x: "test"};
			resolver.p["original.json"].resolve(original);
			doh.assertEqual(true, p.isResolved());
			doh.assertEqual(original, schemaWithTranform.car.d);


		},
		function testByUrlCircle() {
			var resolver = new LocalResolver();
			var p = resolver.resolve(man, "man.json");
			doh.assertEqual(false, p.isResolved());
			resolver.p["meta/car.json"].resolve(car);
			doh.assertEqual(false, p.isResolved());
			resolver.p["meta/engine.json"].resolve(engine);
			doh.assertEqual(true, p.isResolved());
			doh.assertEqual(3, resolver.references.length);
			doh.assertEqual(man, man.car.engine.creator);


		}
	]);

});

