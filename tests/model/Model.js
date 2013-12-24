define([
	"doh/runner", "../../model/Model"], function (doh, Model) {


	var m = new Model();
	m.getPlainValue = function () {
		return 0;
	};

	doh.register("Model", [
		function testError() {
			m.set("state", "Error");
			doh.assertEqual(1, m.errorCount);
		},
		function testResetMeta() {
			m.set("state", "Error");
			m.resetMeta();
			doh.assertEqual(0, m.errorCount);
		},
		function testResetMeta() {
			m.set("state", "Error");
			m.resetMeta();
			doh.assertEqual(0, m.errorCount);
		},
		function testGetModelByEmptyPath() {
			var model = m.getModelByPath("");
			doh.assertEqual(m, model);
		},
		function testGetErrorChangesRemove() {
			var changes = m._getErrorChanges([

			], [
				{path: "x"}
			]);
			doh.assertEqual(0, changes.a.length);
			doh.assertEqual(1, changes.r.length);
		},
		function testGetErrorChangesNone() {
			var changes = m._getErrorChanges([
				{path: "x"}
			], [
				{path: "x"}
			]);
			doh.assertEqual(0, changes.a.length);
			doh.assertEqual(0, changes.r.length);
		},
		function testGetErrorChangesBoth() {
			var changes = m._getErrorChanges([
				{path: "x"},
				{path: "a"}
			], [
				{path: "x"},
				{path: "y"}
			]);
			doh.assertEqual(1, changes.a.length);
			doh.assertEqual(1, changes.r.length);
		},
		function testDefaultMissingMessage() {
			m.addError("", "{missingMessage}");
			doh.assertNotEqual("", m.message);
			doh.assertNotEqual("{missingMessage}", m.message);
		},
		function testSpecialMissingMessage() {
			m.messages.missingMessage = "missing";
			m.addError("", "{missingMessage}");
			doh.assertEqual("missing", m.message);
		},
		function testDefaultInvalidMessage() {
			m.message = "";
			m.addError("", "{invalidMessage}");
			doh.assertNotEqual("", m.message);
			doh.assertNotEqual("{invalidMessage}", m.message);
		},
		function testSpecialInvalidMessage() {
			m.message = "";
			m.messages.invalidMessage = "invalid";
			m.addError("", "{invalidMessage}");
			doh.assertEqual("invalid", m.message);
		},
		function testSpecialInvalidMessageForNoKey() {
			m.message = "";
			m.messages.invalidMessage = "invalid";
			m.addError("");
			doh.assertEqual("invalid", m.message);
		}
	]);


});

