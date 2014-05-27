define(['./createVisitor',
	"doh/runner", "dojo/_base/lang", "dojo/Stateful", "gform/model/MultiGroup", "gform/model/SingleObject", "gform/model/PrimitiveModel"], function (createVisitor, doh, lang, Stateful, MultiGroup, SingleObject, PrimitiveModel) {

	var type =
	{
		groups: [
			{
				attributes: [
					{code: "stringP", type: "string"},
					{code: "booleanP", type: "boolean"}
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

    var ef = {
        createAttributeModel: function(schema) {
            return new PrimitiveModel({schema:schema, editorFactory: ef});
        },
        createGroupModel: function(schema) {
            var so = new SingleObject({schema:schema, editorFactory: ef, subgroup:true});
            so.update({});
            return so;
        }
    };

	var assertEqual = function (expected, actual) {
		doh.assertEqual(JSON.stringify(expected), JSON.stringify(actual));
	};

	var groups = [];
	groups[0] = ef.createGroupModel(type.groups[0]);
	groups[1] = ef.createGroupModel(type.groups[1]);
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
        function testPath() {
            mg.update(object);
            var model = mg.getModelByPath("booleanP");
            assertEqual("booleanP", model.getPath());
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
		},
        function testGetModelByPath() {
			mg.update(object);
			var model = mg.getModelByPath("stringP");
			doh.assertEqual(mg.groups[0].attributes.stringP, model);
		}
	]);


});

