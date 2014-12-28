define(['dojo/_base/declare',
	'dojo/_base/Deferred',
	"doh/runner", "gform/util/Resolver", "gform/schema/Transformer"], function (declare, Deferred, doh, Resolver,Transformer) {

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

	doh.register("gform-util-Resolver", [
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
			resolver.p["meta/externalSchema.json"].resolve('"test"');
			doh.assertEqual(true, p.isResolved());
			resolver.callSetters();
			doh.assertEqual("test", schemaWithExternalRef.car);


		},
		function testByUrlTransform() {
			var resolver = new LocalResolver();
			resolver.transformer = new Transformer();
            resolver.transformer.replace("transformed.json","original.json");

          	var p = resolver.resolve(schemaWithTranform, "");
			doh.assertEqual(false, p.isResolved());
			var original = {x: "test"};
			resolver.p["original.json"].resolve(JSON.stringify(original));
			doh.assertEqual(true, p.isResolved());
			doh.assertEqual("test", schemaWithTranform.car.x);


		},
		function testByUrlCircle() {
			var resolver = new LocalResolver();
			var p = resolver.resolve(man, "man.json");
			doh.assertEqual(false, p.isResolved());
			resolver.p["meta/car.json"].resolve(JSON.stringify(car));
			doh.assertEqual(false, p.isResolved());
			resolver.p["meta/engine.json"].resolve(JSON.stringify(engine));
			doh.assertEqual(true, p.isResolved());
			doh.assertEqual(3, resolver.references.length);
			doh.assertEqual(man, man.car.engine.creator);


		}
	]);

});

