define(['dojox/mvc/equals',
	"doh/runner", "gform/special/formbuilder/GroupTransformer", "gform/model/ArrayModel"], function (equals, doh, GroupTransformer, ArrayModel) {


	doh.register("GroupTransformer", [
		function testAttributes(doh) {
			var group = {
				attributes: [
					{code: "test"}
				]
			};
			var t = new GroupTransformer();
			var out = t.in(group);
			doh.assertTrue(equals([
				{code: "test"}
			], out.attributes));
			doh.assertTrue(equals(["test"], out.group.attributes));
			var pv = t.out(out);
			doh.assertTrue(equals(group, pv));
		}, function testAttributesOrder(doh) {
			var t = new GroupTransformer();
			var model = {
				group: {attributes: ["name", "test"]}, attributes: [
					{code: "test"},
					{code: "name"}
				]
			};
			var pv = t.out(model);
			doh.assertEqual("name", pv.attributes[0].code);
		},
		function testSingleAttribute(doh) {
			var group = {attribute: {code: "test"}};
			var t = new GroupTransformer();
			var out = t.in(group);
			doh.assertTrue(equals([
				{code: "test"}
			], out.attributes));
			doh.assertTrue(equals("test", out.group.attribute));
			var pv = t.out(out);
			doh.assertTrue(equals(group, pv));
		},
		function testSingleGroup(doh) {
			var group = {
				group: {
					attributes: [
						{code: "test"}
					]
				}
			};
			var t = new GroupTransformer();
			var out = t.in(group);
			doh.assertTrue(equals([
				{code: "test"}
			], out.attributes));
			doh.assertTrue(equals(["test"], out.group.group.attributes));
			var pv = t.out(out);
			doh.assertTrue(equals(group, pv));
		},
		function testGroups(doh) {
			var group = {
				code:"type1",
				label:"type1",
				groups: [
					{
						attributes: [
							{
								code: "test"
							}
						]
					}
				]
			};
			var t = new GroupTransformer();
			var out = t.in(group);
			doh.assertTrue(equals([
				{code: "test"}
			], out.attributes));
			doh.assertTrue(equals(["test"], out.group.groups[0].attributes));
			doh.assertEqual(out.code, "type1");
			var pv = t.out(out);
			doh.assertTrue(equals(group, pv));
		}
	]);


});

