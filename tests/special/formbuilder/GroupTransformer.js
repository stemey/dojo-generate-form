define(['dojox/mvc/equals',
	"doh/runner", "gform/special/formbuilder/GroupTransformer", "gform/model/ArrayModel"], function (equals, doh, GroupTransformer, ArrayModel) {


	doh.register("GroupTransformer", [
		function testAttributes(doh) {
			var group = {
				editor:"fff",
				label:"label",
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
			doh.assertEqual("fff", out.group.editor);
			doh.assertEqual("label", out.label);
			var pv = t.out(out);
			doh.assertTrue(equals(group, pv));
		}, function testAttributesOrder(doh) {
			var t = new GroupTransformer();
			var model = {
				group: {editor:"ff",attributes: ["name", "test"]}, attributes: [
					{code: "test"},
					{code: "name"}
				]
			};
			var pv = t.out(model);
			doh.assertEqual("name", pv.attributes[0].code);
			doh.assertEqual("ff", pv.editor);
		},
		function testSingleAttribute(doh) {
			var group = {editor:"single",attribute: {code: "test"}};
			var t = new GroupTransformer();
			var out = t.in(group);
			doh.assertTrue(equals([
				{code: "test"}
			], out.attributes));
			doh.assertTrue(equals("test", out.group.attribute));
			var pv = t.out(out);

			doh.assertTrue(equals(group, pv));
			doh.assertEqual("single",pv.editor);
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
				editor:"hh",
				groups: [
					{
						editor:"kk",
						"label":"fff",
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
			doh.assertEqual(out.group.editor, "hh");
			var pv = t.out(out);
			doh.assertTrue(equals(group, pv));
		}
	]);


});

