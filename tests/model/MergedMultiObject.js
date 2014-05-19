define(["./createVisitor",
	"doh/runner", "dojo/_base/lang", "gform/model/MergedMultiObject", "gform/model/PrimitiveModel"], function (createVisitor, doh, lang, MergedMultiObject, PrimitiveModel) {

	var type =
	{
		type: "multi-object",
		typeProperty: "type",
		groups: [
			{
				code: "type1",
				attributes: [
					{code: "type", type: "string"},
					{code: "stringP", type: "string", defaultValue:"oops"},
					{code: "booleanP", type: "boolean", defaultValue:true}
				]
			},
			{
				code: "type2",
				attributes: [
					{code: "type", type: "string"},
					{code: "booleanP", type: "boolean"},
					{code: "numberP", type: "number"}
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


	var mo = MergedMultiObject.create(type, function (attribute) {
		return new PrimitiveModel({meta:attribute});
	});


	doh.register("MergedMultiObject", [
		function testValue() {
			mo.update(object1);
			var plainValue = mo.getPlainValue();
			assertEqual(object1, plainValue);
		},
		function testNull() {
			mo.update(null);
			var plainValue = mo.getPlainValue();
			assertEqual(null, plainValue);
		},
        function testPath() {
            mo.update(object2);
            doh.assertEqual("booleanP", mo.getModelByPath("booleanP").getPath());
        },
		function testSwitchType() {
			mo.update(object2);
			mo.update(object1);
			mo.set("currentTypeCode", "type2");
			var plainValue = mo.getPlainValue(mo);
			assertEqual(true, plainValue.booleanP);
			assertEqual(3, plainValue.numberP);
			assertEqual("type2", plainValue.type);
		},
		function testVisit() {
			mo.update(object2);
			var visitor = createVisitor();
			mo.visit(lang.hitch(visitor, "fn"));
			assertEqual(["noidx", "type", "booleanP", "numberP"], visitor.events);
		}, function testParent() {
			doh.assertEqual(mo, mo.attributes.stringP.parent);
		},
		function testGetModelByPath() {
			mo.update(object2);
			var pmodel = mo.getModelByPath("numberP");
			doh.assertEqual(3, pmodel.getPlainValue());
		},
        function updateAttribute(t) {
            mo.update({type: "type1",
                stringP: "hallo"});
            mo.attributes.booleanP.set("value",true);
            t.assertEqual(true, mo.getPlainValue().booleanP);
        },
        function testInitDefault(t) {
            mo.set("plainValue",null);
            mo.initDefault();
            t.assertEqual(true, mo.getPlainValue().booleanP);
            t.assertEqual("oops", mo.getPlainValue().stringP);
        }
	]);


});

