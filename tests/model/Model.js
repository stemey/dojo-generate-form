define([
	"doh/runner", "../../model/Model"], function (doh, Model) {


	var m = new Model();
	m.init();
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
			m.resetMetaRecursively();
			m.forceChangeNotification();
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
		function testAlwayUseInvalidMessage() {
            m.alwaysUseInvalidMessage=true;
            m.messages.invalidMessage="expected";
            var msg = m.getMessage("error", true);
            doh.assertEqual("expected", msg);
        },
        function testAlwayUseInvalidMessageButNotSet() {
            m.alwaysUseInvalidMessage=true;
            delete m.messages.invalidMessage;
            var msg = m.getMessage("error", true);
            doh.assertEqual("error", msg);
        },
        function testMessage() {
            m.alwaysUseInvalidMessage=false;
            delete m.messages.invalidMessage;
            var msg = m.getMessage("error1", true);
            doh.assertEqual("error1", msg);
        },
        function testNoCustomMessage() {
            m.alwaysUseInvalidMessage=false;
            m.messages.invalidMessage="invalid";
            var msg = m.getMessage("error4", true);
            doh.assertEqual("invalid", msg);
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

