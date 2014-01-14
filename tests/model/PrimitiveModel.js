define([
	"doh/runner",
	"gform/model/PrimitiveModel"
], function (doh, PrimitiveModel) {


	var m = new PrimitiveModel({required: true});

	doh.register("PrimitiveModel", [
		function testChanged() {
			m.update("x");
			doh.assertEqual(false, m.hasChanged());
		},
        function testMeta() {
            m.update("x");
            doh.assertEqual(false, m.hasChanged());
            doh.assertEqual(0, m.errorCount);
            doh.assertEqual(0, m.incompleteCount);
            doh.assertEqual(0, m.changedCount);
            m.set("value","y");
            doh.assertEqual(true, m.hasChanged());
            doh.assertEqual(0, m.errorCount);
            doh.assertEqual(0, m.incompleteCount);
            doh.assertEqual(1, m.changedCount);
            m.resetMeta();
            doh.assertEqual(0, m.changedCount);
        },
		function testIncomplete() {
			m.update(null);
			m.validate();
			doh.assertEqual(false, m.hasChanged());
			doh.assertEqual(null, m.getPlainValue());
			doh.assertEqual("Incomplete", m.state);
		}, function testTouch() {
			m.update(null);
			m.validate();
			doh.assertEqual("Incomplete", m.state);
			m.onTouch();
			doh.assertEqual("Error", m.state);

		}
	]);


});

