define(['dojo/_base/lang',
	"./createVisitor",
	"doh/runner",
    "gform/model/SingleObject",
    "gform/model/PrimitiveModel"
], function (lang, createVisitor, doh, SingleObject, PrimitiveModel) {

	var type =
	{
		type: "single-object",
        additionalProperties:{
            code:"addProp"
        },
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
		attributes[attribute.code] = new PrimitiveModel({meta:attribute});
	});
    attributes[type.additionalProperties.code]= new PrimitiveModel({meta:{}});
	var so = new SingleObject({meta:type,attributes: attributes});


	doh.register("SingleObject", [
		function testParent() {
			doh.assertEqual(so, so.attributes.stringP.parent);
		},
		function testValue() {
			so.update(object);
			var plainValue = so.getPlainValue(so);
			assertEqual(object, plainValue);
		},
        function testPath() {
            so.update(object);
            var model = so.getModelByPath("booleanP");
            assertEqual("booleanP", model.getPath());
        },
        function testNull() {
			so.update(null);
			var plainValue = so.getPlainValue(so);
			assertEqual(null, plainValue);
			so.update({});
			doh.assertTrue(so.getPlainValue() != null);
		},
		function testSetIsNull() {
			so.update({});
			so.set("isNull", true);
			assertEqual(null, so.getPlainValue());
			so.set("isNull", false);
			doh.assertTrue(so.getPlainValue() != null);
		},
		function testDefaults() {
			so.update({});
			var plainValue = so.getPlainValue(so);
			assertEqual({stringP: null, booleanP: null, numberP: null}, plainValue);
		},
		function testResetMetaRecursively() {
			so.getAttribute("stringP").set("value", "XXX");
            so.getAttribute("stringP").set("state", "Error");
            so.set("state", "Error");
			assertEqual(2, so.errorCount);
            assertEqual(1, so.changedCount);
            assertEqual(true, so.hasChanged());
            so.resetMetaRecursively();
			assertEqual(0, so.errorCount);
            assertEqual(0, so.changedCount);
            assertEqual(false, so.hasChanged());
		},
		function testVisit() {
			var visitor = createVisitor();
			so.visit(lang.hitch(visitor, "fn"));
			assertEqual(["noidx", "stringP", "booleanP", "numberP", "addProp"], visitor.events);
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
		},
        function testModelValidation(t) {
            so.resetMetaRecursively();
            so.validators = [function(model, force) {
                if (force && model.getModelByPath("stringP").getPlainValue()==="y") {
                    return [{path:"",message:"stringP must not be y"}];
                } else {
                    return [];
                }
            }];
            so.update({stringP:"y"});
            t.assertEqual(0, so.get("errorCount"));
            so.validateRecursively(true);
            t.assertEqual(1, so.get("errorCount"));
            so.resetMetaRecursively();
            t.assertEqual(0, so.get("errorCount"));
        },
        function testModelValidation(t) {
            so.resetMetaRecursively();
            so.validators = [function(model, force) {
                if (force && model.getModelByPath("stringP").getPlainValue()==="y") {
                    return [{path:"",message:"stringP must not be y"}];
                } else {
                    return [];
                }
            }];
            so.update({stringP:"y"});
            t.assertEqual(0, so.get("errorCount"));
            so.validateRecursively(true);
            t.assertEqual(1, so.get("errorCount"));
            so.resetMetaRecursively();
            t.assertEqual(0, so.get("errorCount"));
        },
        function testAdditionalProperties(t) {
            so.resetMetaRecursively();
            var value = {stringP:"Hallo", extraProp1:"oops", extraProp2:3};
            so.update(value);
            t.assertTrue(so.getModelByPath("addProp")!==null);
            t.assertEqual("oops",so.getPlainValue().extraProp1);
        },
        function testTransformIn(t) {
            var transformed = so.transformIn({x:3,stringP:"hi"});
            t.assertEqual("hi",transformed.stringP);
            t.assertEqual(3,transformed.addProp.x);
        },
        function testTransformOut(t) {
            var transformed = so.transformOut({addProp:{x:3},stringP:"hi"});
            t.assertEqual("hi",transformed.stringP);
            t.assertEqual(3,transformed.x);
        },
        function testGetAdditionalAttributeCode(t) {
            var a = so._getAdditionalAttributeCode();
            t.assertEqual("addProp",a);
        },
        function testGetAttributeCodes(t) {
            var codes = so._getAttributeCodes();
            t.assertEqual(4,codes.length);

        }
	]);


});

