define(['dojo/_base/lang',
	"./createVisitor",
	"doh/runner", "gform/model/SingleObject", "gform/model/PrimitiveModel"], function (lang, createVisitor, doh, SingleObject, PrimitiveModel) {

	var type =
	{
		type: "single-object",
		attributes: [
			{code: "stringP", type: "string"},
			{code: "booleanP", type: "boolean"},
			{code: "numberP", type: "number"}
		]
	};
	var object = {
		stringP: "hallo",
		booleanP: true,
		numberP: 23
	};


	var assertEqual = function (expected, actual) {
		doh.assertEqual(JSON.stringify(expected), JSON.stringify(actual));
	};

	var attributes = {};
	type.attributes.forEach(function (attribute) {
		attributes[attribute.code] = new PrimitiveModel(attribute);
	});
	var so = new SingleObject({attributes: attributes});

	doh.register("SingleObject", [
		function testParent() {
			doh.assertEqual(so, so.attributes.stringP.parent);
		},
		function testValue() {
			so.update(object);
			var plainValue = so.getPlainValue(so);
			assertEqual(object, plainValue);
		},
		function testNull() {
			so.update(null);
			var plainValue = so.getPlainValue(so);
			assertEqual(null, plainValue);
		},
		function testDefaults() {
			so.update({});
			var plainValue = so.getPlainValue(so);
			assertEqual({stringP: null, booleanP: null, numberP: null}, plainValue);
		},
		function testResetMetaRecursively() {
			so.getAttribute("stringP").set("state", "Error");
			so.set("state", "Error");
			assertEqual(2, so.errorCount);
			so.resetMetaRecursively();
			assertEqual(0, so.errorCount);
		},
		function testVisit() {
			var visitor = createVisitor();
			so.visit(lang.hitch(visitor, "fn"));
			assertEqual(["noidx", "stringP", "booleanP", "numberP"], visitor.events);
		},
		function testState() {
			assertEqual(0, so.errorCount);
			so.getAttribute("stringP").set("state", "Error");
			assertEqual(1, so.errorCount);
		},
		function testGetModelByPath() {
			var pmodel = so.getAttribute("stringP");
			var pmodel2 = so.getModelByPath("stringP");
			doh.assertEqual(pmodel, pmodel2);
		},
		function testChanged() {
			so.setValue("stringP", "x");
			assertEqual(1, so.changedCount);
		},
		function testError() {
			so.addError("stringP", "x");
			assertEqual(1, so.errorCount);
			so.update(null);
			assertEqual(0, so.errorCount);
		},
		function testError(t) {
			so.required = true;
			so.update(null);
			t.assertNotEqual(null, so.getPlainValue());
		}
	]);


});

