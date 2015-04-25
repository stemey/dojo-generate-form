define(['dojo/_base/lang',
	'./createVisitor',
	"doh/runner", "gform/model/PrimitiveModel", "gform/model/ArrayModel"], function (lang, createVisitor, doh, PrimitiveModel, ArrayModel) {

	var type = {type: "string"};


	var assertEqual = function (expected, actual) {
		doh.assertEqual(JSON.stringify(expected), JSON.stringify(actual));
	};

	var elementFactory = function (value) {
		var model = new PrimitiveModel(type);
		model.update(value, false);
		model.init();
		return model;
	};
	var am = new ArrayModel({elementFactory: elementFactory});
	am.init();

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
			am.update(null, true);
			var plainValue = am.getPlainValue();
			assertEqual([], plainValue);
		},
		function testDefaults() {
			am.update(["a", "b"], true);
			am.push("x");
			var plainValue = am.getPlainValue();
			assertEqual(["a", "b", "x"], plainValue);
		},
		function testState() {
			assertEqual(0, am.errorCount);
			am.getModelByIndex(1).set("state", "Error");
			assertEqual(1, am.errorCount);
		},
		function testChangedState() {
			am.update(["a", "b"], true);
			am.getModelByIndex(1).update("v", false, true);
			assertEqual(1, am.changedCount);
		},
		function testAddedState() {
			am.update(["a"], true);
			am.push("b");
			assertEqual(1, am.changedCount);
			assertEqual(0, am.getModelByIndex(1).changedCount);
		},
		function testHasChanged() {
			var am = new ArrayModel({elementFactory: elementFactory});
			am.init();
			doh.assertEqual(false,am.hasChanged());
			am.update([], false, true);
			doh.assertEqual(false,am.hasChanged());
			am.update(null, false, true);
			doh.assertEqual(false,am.hasChanged());
		},
		function testHasChanged() {
			var am = new ArrayModel({elementFactory: elementFactory});
			am.init();
			doh.assertEqual(false,am.hasChanged());
			am.update(["kkk"], false, true);
			doh.assertEqual(true,am.hasChanged());
			am.update(null, false, true);
			doh.assertEqual(false,am.hasChanged());
		},
		function testRemovedState() {
			am.update(["a", "b"], true);
			am.pop();
			assertEqual(1, am.changedCount);
		},
		function testGetModelByPath() {
			am.update(["a", "b"], true);
			assertEqual("b", am.getModelByPath("1").getPlainValue());
		},
		function testVisit() {
			var visitor = createVisitor();
			am.visit(lang.hitch(visitor, "fn"));
			assertEqual(["noidx", 0, 1], visitor.events);
		}
	]);


});

