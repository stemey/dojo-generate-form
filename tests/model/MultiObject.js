define(["dojo/_base/lang",
    "./createVisitor",
    "doh/runner", "gform/model/SingleObject", "gform/model/MultiObject", "gform/model/PrimitiveModel"], function (lang, createVisitor, doh, SingleObject, MultiObject, PrimitiveModel) {

    var type =
    {
        type: "multi-object",
        additionalProperties: {
            code: "addProp"
        },
        typeProperty: "type",
        groups: [
            {
                code: "type1",
                attributes: [
                    {code: "type", type: "string"},
                    {code: "stringP", type: "string", defaultValue: "oops"},
                    {code: "booleanP", type: "boolean", defaultValue: true},
                    {code: "addProp", type: "any"}
                ]
            },
            {
                code: "type2",
                attributes: [
                    {code: "type", type: "string"},
                    {code: "booleanP", type: "boolean"},
                    {code: "numberP", type: "number", "defaultValue": 3},
                    {code: "addProp", type: "any"}
                ]
            }
        ]
    };
    var object1 = {
        type: "type1",
        stringP: "hallo",
        booleanP: true
    };
    var object2 = {
        type: "type2",
        booleanP: true,
        numberP: 3
    };


    var assertEqual = function (expected, actual) {
        doh.assertEqual(JSON.stringify(expected), JSON.stringify(actual));
    };


    var ef = {
        createAttributeModel: function (schema) {
            var m = new PrimitiveModel({schema: schema, editorFactory: ef});
			m.init();
			return m;
        },
        createGroupModel: function (schema) {
            var so = new SingleObject({schema: schema, editorFactory: ef});
            so.update({},false);
			so.init();
            return so;
        }
    };


    var mo = new MultiObject.create({schema: type, editorFactory: ef});


    doh.register("MultiObject", [
        function testAddGroup(t) {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            mo.update(object1, false);
            mo.init();
            mo.set("currentTypeCode", "type2");
			var plainValue = mo.getPlainValue();
			t.assertEqual(0,mo.changedCount);
			t.assertTrue(plainValue !== null);
            t.assertTrue(plainValue.booleanP);
            t.assertEqual(3, plainValue.numberP);
        },
        function testValue() {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            mo.update(object1);
			mo.init();
			var plainValue = mo.getPlainValue();
            assertEqual(object1, plainValue);
        },
        function testNull() {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            mo.update(null);
			mo.init();
            var plainValue = mo.getPlainValue();
            assertEqual(null, plainValue);
        },
        function testSwitchType() {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            mo.update(object2);
			mo.init();
            mo.update(object1);
            mo.set("currentTypeCode", "type2");
            var plainValue = mo.getPlainValue(mo);
            assertEqual(true, plainValue.booleanP);
            assertEqual("type2", plainValue.type);
        },
		function testChanged() {
			var mo = new MultiObject.create({schema: type, editorFactory: ef});
			mo.update(object2,true);
			mo.getModelByPath("numberP").update(121212,false,true);
			assertEqual(1, mo.changedCount);
		},
		function testTypeChanged() {
			var mo = new MultiObject.create({schema: type, editorFactory: ef});
			mo.init();
			mo.update({type:"type2"},true);
			mo.set("currentTypeCode","type1");
			assertEqual(1, mo.changedCount);
		},
		function testGetModelByPath() {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            mo.set("currentTypeCode", "type1");
            var pmodel = mo.getGroup("type1").getAttribute("stringP");
            var pmodel2 = mo.getModelByPath("stringP");
            doh.assertEqual(pmodel, pmodel2);
        },
        function testVisit() {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            var visitor = createVisitor();
            mo.set("currentTypeCode", "type1");
            mo.visit(lang.hitch(visitor, "fn"));
            assertEqual(["noidx", "noidx", "type", "stringP", "booleanP", "addProp"], visitor.events);
        },
        function testNullAndRequired() {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            mo.required = true;
            mo.update(null);
            doh.assertFalse(mo.getPlainValue() === null);
        },
        function testModelValidation(t) {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
			mo.init();
            mo.resetMetaRecursively(true);
			mo.validators = [function (model, force) {
                if (force && model.getModelByPath("stringP").getPlainValue() === "y") {
                    return [
                        {path: "", message: "stringP must not be y"}
                    ];
                } else {
                    return [];
                }
            }];
            mo.update({type: "type1", stringP: "y"});
            t.assertEqual(0, mo.get("errorCount"));
            mo.validateRecursively(true);
            t.assertEqual(1, mo.get("errorCount"));
            mo.resetMetaRecursively(true);
			t.assertEqual(0, mo.get("errorCount"));
        },
        function testAdditionalProperties(t) {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            var value = {type: "type1", stringP: "Hallo", extraProp1: "oops", extraProp2: 3};
            mo.update(value);
            t.assertTrue(mo.getModelByPath("addProp") !== null);
            t.assertEqual("oops", mo.getPlainValue().extraProp1);
        },
        function testInitDefault(t) {
            var mo = new MultiObject.create({schema: type, editorFactory: ef});
            mo.set("plainValue", null);
            mo.initDefault();
            t.assertEqual("oops", mo.getPlainValue().stringP);
            t.assertEqual(true, mo.getPlainValue().booleanP);
        }
    ]);


});

