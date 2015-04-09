define(['dojo/_base/lang',
    "./createVisitor",
    "doh/runner",
    "gform/model/SingleObject",
    "gform/model/PrimitiveModel"
], function (lang, createVisitor, doh, SingleObject, PrimitiveModel) {

    var type =
    {
        type: "single-object",
        additionalProperties: {
            code: "addProp"
        },
        attributes: [
            {code: "stringP", type: "string", "defaultValue": "default", required: true},
            {code: "booleanP", type: "boolean", defaultValue: true},
            {code: "numberP", type: "number", defaultValue: 2},
            {code: "addProp", type: "any"}
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
    var ef = {
        createAttributeModel: function(schema, plainValue) {
            return new PrimitiveModel({schema: schema});
        }
    };

    var so;

    var createModel = function() {
        so = new SingleObject({schema: type, editorFactory: ef});
        so.update({});
		so.init();
    };


    doh.register("SingleObject", [
        function testParent() {
            createModel();
            doh.assertEqual(so, so.attributes.stringP.parent);
        },
        function testValue(t) {
            createModel();
            so.update(object);
            var plainValue = so.getPlainValue(so);
            assertEqual(object, plainValue);
        },
        function testPath() {
            createModel();
            so.update(object);
            var model = so.getModelByPath("booleanP");
            assertEqual("booleanP", model.getPath());
        },
		function testWatchPath() {
			createModel();
			so.update(object);
			var called=false;
			var model = so.watchPath("numberP", function() {
				called=true;
			});
			so.getModelByPath("numberP").set("value",123)
			assertEqual(true,called);
		},
		function testNull() {
            createModel();
            so.update(null);
            var plainValue = so.getPlainValue(so);
            assertEqual(null, plainValue);
            so.update({});
            doh.assertTrue(so.getPlainValue() != null);
        },
        function testSetIsNull() {
            createModel();
            so.initDefault(true);
			assertEqual("default",so.oldValue.stringP);
            so.set("isNull", true);
            assertEqual(null, so.getPlainValue());
			doh.assertEqual(1,so.get("changedCount"));
            so.set("isNull", false);
            doh.assertTrue(so.getPlainValue() !== null);
			doh.assertEqual(0,so.get("changedCount"));
        },
		function testToggleNull() {
			createModel();
			so.update(null, true);
			assertEqual(null, so.getPlainValue());
			doh.assertEqual(0,so.get("changedCount"));
			so.set("isNull", false);
			doh.assertTrue(so.getPlainValue() !== null);
			doh.assertEqual(1,so.get("changedCount"));
			so.set("isNull", true);
			doh.assertEqual(0,so.get("changedCount"));
		},
        function testDefaults() {
            createModel();
            so.update({});
            var plainValue = so.getPlainValue(so);
			assertEqual({stringP: "default", booleanP: true, numberP: 2}, plainValue);
        },
        function testResetMetaRecursively() {
            createModel();
            so.getAttribute("stringP").set("value", "XXX");
            so.getAttribute("stringP").set("state", "Error");
            so.set("state", "Error");
            assertEqual(2, so.errorCount);
            assertEqual(1, so.changedCount);
            assertEqual(true, so.hasChanged());
            so.resetMetaRecursively(true);
			assertEqual(0, so.errorCount);
        },
		function testResetMetaRecursively() {
			createModel();
			so.getAttribute("stringP").set("value", "XXX");
			so.getAttribute("stringP").set("state", "Error");
			so.set("state", "Error");
			assertEqual(2, so.errorCount);
			assertEqual(1, so.changedCount);
			assertEqual(true, so.hasChanged());
			so.resetMetaRecursively(true);
			assertEqual(0, so.errorCount);
			assertEqual(1, so.changedCount);
		},
		function testRemoveIndicators() {
			createModel();
			so.getAttribute("stringP").set("value", "XXX");
			so.getAttribute("stringP").set("state", "Error");
			so.set("state", "Error");
			assertEqual(2, so.errorCount);
			assertEqual(1, so.changedCount);
			assertEqual(true, so.hasChanged());
			so.removeIndicators(true);
			assertEqual(0, so.errorCount);
			assertEqual(0, so.changedCount);
		},
		function testReset() {
			createModel();
			so.getAttribute("stringP").set("value", "XXX");
			so.getAttribute("stringP").set("state", "Error");
			so.set("state", "Error");
			assertEqual(2, so.errorCount);
			assertEqual(1, so.changedCount);
			assertEqual(true, so.hasChanged());
			so.reset(true);
			assertEqual(0, so.errorCount);
			assertEqual(0, so.changedCount);
			assertEqual(false, so.hasChanged());
		},
        function testVisit() {
            createModel();
            so.update({});
            var visitor = createVisitor();
            so.visit(lang.hitch(visitor, "fn"));
            assertEqual(["noidx", "stringP", "booleanP", "numberP", "addProp"], visitor.events);
        },
        function testState() {
            createModel();
            assertEqual(0, so.errorCount);
            so.getAttribute("stringP").set("state", "Error");
            assertEqual(1, so.errorCount);
        },
        function testGetModelByPath() {
            createModel();
            var pmodel = so.getAttribute("stringP");
            var pmodel2 = so.getModelByPath("stringP");
            doh.assertEqual(pmodel, pmodel2);
        },
        function testChanged() {
            createModel();
            so.setValue("stringP", "x");
            assertEqual(1, so.changedCount);
        },
		function testChangedFromNull() {
			so = new SingleObject({schema: type, editorFactory: ef});
			so.update(null);
			so.init();
			so.update({numberP:5},false);
			assertEqual(1, so.changedCount);
		},
		function testError() {
            createModel();
            so.addError("stringP", "x");
            assertEqual(1, so.errorCount);
            so.update(null);
            assertEqual(0, so.errorCount);
        },
        function testError(t) {
            createModel();
            so.required = true;
            so.update(null);
            t.assertNotEqual(null, so.getPlainValue());
        },
        function testModelValidation(t) {
            createModel();
            so.resetMetaRecursively();
            so.validators = [function (model, force) {
                if (force && model.getModelByPath("stringP").getPlainValue() === "y") {
                    return [
                        {path: "", message: "stringP must not be y"}
                    ];
                } else {
                    return [];
                }
            }];
            so.update({stringP: "y"});
            t.assertEqual(0, so.get("errorCount"));
            so.validateRecursively(true);
            t.assertEqual(1, so.get("errorCount"));
            so.resetMetaRecursively(true);
			t.assertEqual(0, so.get("errorCount"));
        },
        function testAdditionalProperties(t) {
            createModel();
            so.resetMetaRecursively();
            var value = {stringP: "Hallo", extraProp1: "oops", extraProp2: 3};
            so.update(value);
            t.assertTrue(so.getModelByPath("addProp") !== null);
            t.assertEqual("oops", so.getPlainValue().extraProp1);
        },
        function testTransformIn(t) {
            createModel();
            var transformed = so.transformIn({x: 3, stringP: "hi"});
            t.assertEqual("hi", transformed.stringP);
            t.assertEqual(3, transformed.addProp.x);
        },
        function testTransformOut(t) {
            createModel();
            var transformed = so.transformOut({addProp: {x: 3}, stringP: "hi"});
            t.assertEqual("hi", transformed.stringP);
            t.assertEqual(3, transformed.x);
        },
        function testGetAdditionalAttributeCode(t) {
            createModel();
            var a = so._getAdditionalAttributeCode();
            t.assertEqual("addProp", a);
        },
        function testGetAttributeCodes(t) {
            createModel();
            var codes = so._getAttributeCodes();
            t.assertEqual(4, codes.length);
        },
        function testInitDefault(t) {
            so = new SingleObject({schema: type, editorFactory: ef});
            so.initDefault();
            t.assertEqual("default", so.getPlainValue().stringP);
            t.assertEqual(2, so.getPlainValue().numberP);
            t.assertEqual(true, so.getPlainValue().booleanP);
            t.assertEqual(false, so.hasChanged());
            t.assertEqual("", so.state);
            t.assertEqual(0, so.get("errorCount"));
        }

    ]);


});

