define(['dojo/_base/lang',
	'./createVisitor',
	"doh/runner", "gform/model/PrimitiveModel", "gform/model/ArrayModel"], function (lang, createVisitor, doh, PrimitiveModel, ArrayModel) {

	var type = {type: "string"};


	var assertEqual = function (expected, actual) {
		doh.assertEqual(JSON.stringify(expected), JSON.stringify(actual));
	};

	var elementFactory = function (value) {
		var model = new PrimitiveModel(type);
		model.update(value);
		return model;
	};
	var am = new ArrayModel({elementFactory: elementFactory});

	doh.register("ArrayModel", [
		function testParent() {
			am.update(["a", "b"]);
			doh.assertEqual(am, am.value[0].parent);
			doh.assertEqual(am, am.value[1].parent);
		},
		function testindexes() {
			am.update(["a", "b"]);
			doh.assertEqual(0, am.value[0].index);
			doh.assertEqual(1, am.value[1].index);
		},
        function testPath() {
            am.update(["a", "b"]);
            doh.assertEqual("0", am.getModelByPath("0").getPath());
        },
		function testValue() {
			am.update(["a", "b"]);
			var plainValue = am.getPlainValue();
			assertEqual(["a", "b"], plainValue);
		},
		function testNull() {
			am.update(null);
			var plainValue = am.getPlainValue();
			assertEqual([], plainValue);
		},
		function testDefaults() {
			am.update(["a", "b"]);
			am.push("x");
			var plainValue = am.getPlainValue();
			assertEqual(["a", "b", "x"], plainValue);
		},
		function testState() {
			assertEqual(0, am.errorCount);
			am.getModelByIndex(1).set("state", "Error");
			assertEqual(1, am.errorCount);
		},
		function testChanged() {
			am.getModelByIndex(1).update("v");
			assertEqual(1, am.changedCount);
		},
		function testGetModelByPath() {
			am.update(["a", "b"]);
			assertEqual("b", am.getModelByPath("1").getPlainValue());
		},
		function testVisit() {
			var visitor = createVisitor();
			am.visit(lang.hitch(visitor, "fn"));
			assertEqual(["noidx", 0, 1], visitor.events);
		}
	]);


});

