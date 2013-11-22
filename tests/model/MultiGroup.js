define(['./createVisitor',
	"doh/runner", "dojo/_base/lang", "dojo/Stateful", "gform/model/MultiGroup", "gform/model/SingleObject", "gform/model/PrimitiveModel"], function (createVisitor, doh, lang, Stateful, MultiGroup, SingleObject, PrimitiveModel) {

	var type =
	{
		groups: [
			{
				attributes: [
					{code: "stringP", type: "string"},
					{code: "booleanP", type: "boolean"},
				]
			},
			{
				attributes: [
					{code: "numberP", type: "number"}
				]
			}
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

	var createSo = function (attributes) {
		var as = {};
		attributes.forEach(function (attribute) {
			as[attribute.code] = new PrimitiveModel(attribute);
		});
		return new SingleObject({attributes: as, subgroup: true});
	};

	var groups = [];
	groups[0] = createSo(type.groups[0].attributes);
	groups[1] = createSo(type.groups[1].attributes);
	var mg = new MultiGroup({groups: groups});

	doh.register("MultiGroup", [
		function testParent() {
			doh.assertEqual(mg, mg.groups[0].parent);
		},
		function testValue() {
			mg.update(object);
			var plainValue = mg.getPlainValue();
			assertEqual(object, plainValue);
		},
		function testNull() {
			mg.update(null);
			var plainValue = mg.getPlainValue();
			assertEqual(null, plainValue);
		},
		function testDefaults() {
			mg.update({});
			var plainValue = mg.getPlainValue();
			assertEqual({stringP: null, booleanP: null, numberP: null}, plainValue);
		},
		function testVisit() {
			mg.update(object);
			var visitor = createVisitor();
			mg.set("currentTypeCode", "type1");
			mg.visit(lang.hitch(visitor, "fn"));
			assertEqual([ "stringP", "booleanP", "numberP"], visitor.events);
		}, function testGetModelByPath() {
			mg.update(object);
			var model = mg.getModelByPath("stringP");
			doh.assertEqual(mg.groups[0].attributes.stringP, model);
		}
	]);


});

