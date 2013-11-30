define([
	"gform/model/SingleObject",
	"doh/runner",
	"gform/model/SelectModel"
], function (SingleObject, doh, SelectModel) {


	var m1 = new SelectModel({options: [
		{value: "1"},
		{value: "2"}
	], required: true});
	var attributes = {
		"first": m1
	};
	var o = new SingleObject({attributes: attributes});

	doh.register("SelectModel", [
		function testInvalid() {
			o.update({"first": "x"});
			doh.assertEqual("1", m1.getPlainValue());
		}, function testDefault() {
			o.update({});
			doh.assertEqual("1", m1.getPlainValue());
			doh.assertEqual(0, m1.incompleteCount);
		}, function testValid() {
			o.update({"first": "2"});
			doh.assertEqual("2", m1.getPlainValue());
		}
	]);


});

