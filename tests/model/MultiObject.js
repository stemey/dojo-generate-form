define(["dojo/_base/lang",
	"./createVisitor",
	"doh/runner", "gform/model/SingleObject", "gform/model/MultiObject", "gform/model/PrimitiveModel"], function (lang, createVisitor, doh, SingleObject, MultiObject, PrimitiveModel) {

	var type =
	{
		type: "multi-object",
		typeProperty: "type",
		groups: [
			{
				code: "type1",
				attributes: [
					{code: "type", type: "string"},
					{code: "stringP", type: "string"},
					{code: "booleanP", type: "boolean"}
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


	var createSo = function (schema) {
		var attributes = {};
		schema.attributes.forEach(function (attribute) {
			attributes[attribute.code] = new PrimitiveModel();
		});
		var so = new SingleObject({typeCode: schema.code, attributes: attributes});
		so.update({});
		return so;
	};


	var so1 = createSo(type.groups[0]);
	var so2 = createSo(type.groups[1]);

	var mo = new MultiObject.create({meta: type, groups: [so1, so2]});


	doh.register("MultiObject", [
		function testParent() {
			doh.assertEqual(mo, mo.groups[0].parent);
			doh.assertEqual(mo, mo.groups[1].parent);
		},
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
		function testSwitchType() {
			mo.update(object2);
			mo.update(object1);
			mo.set("currentTypeCode", "type2");
			var plainValue = mo.getPlainValue(mo);
			assertEqual(true, plainValue.booleanP);
			assertEqual("type2", plainValue.type);
		},
		function testGetModelByPath() {
			mo.set("currentTypeCode", "type1");
			var pmodel = mo.getGroup("type1").getAttribute("stringP");
			var pmodel2 = mo.getModelByPath("stringP");
			doh.assertEqual(pmodel, pmodel2);
		},
		function testVisit() {
			var visitor = createVisitor();
			mo.set("currentTypeCode", "type1");
			mo.visit(lang.hitch(visitor, "fn"));
			assertEqual(["noidx", "type", "stringP", "booleanP"], visitor.events);
		},
		function testNullAndRequired() {
			mo.required = true;
			mo.update(null);
			doh.assertFalse(mo.getPlainValue() == null);
		}
	]);


});

