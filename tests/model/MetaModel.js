define([
	"doh/runner", "gform/model/MetaModel"], function (doh, MetaModel) {


	var m = new MetaModel();
	m.getPlainValue = function () {
		return 0;
	};

	doh.register("MetaModel", [
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
		}
	]);


});

