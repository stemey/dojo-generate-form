define([
	'gform/model/SingleObject',
	'gform/model/PrimitiveModel',
	"doh/runner",
	"gform/model/MappedSelectModel"
], function (SingleObject, PrimitiveModel, doh, MappedSelectModel) {


	var m1 = new PrimitiveModel({meta:{},required: true});
	var m2 = new MappedSelectModel({meta:{},mappedAttribute: "first", mappedValues: {"x": [
		{value: "1"},
		{value: "2"}
	], "y": [
		{value: "2"},
		{value: "3"}
	]}, required: true});
	var attributes = {
		"first": m1,
		"second": m2
	};
	var o = new SingleObject({attributes: attributes});

	doh.register("MappedSelectModel", [
		function testDefault() {
			o.update({"first": "x"});
			doh.assertEqual("1", m2.getPlainValue());
		}, function testNoMapping() {
			o.update({"first": "z"});
			doh.assertEqual(null, m2.getPlainValue());
		}, function testCorrectMapping() {
			o.update({"first": "x", "second": "2"});
			doh.assertEqual("2", m2.getPlainValue());
		}, function testCommonMapping() {
			o.update({"first": "x", "second": "2"});
			m1.set("value", "y");
			doh.assertEqual("2", m2.getPlainValue());
		}
	]);


});

