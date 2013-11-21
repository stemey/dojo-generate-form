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
		}
	]);


});

