define(['../../../doc/schema/Schema',
	"doh/runner"  ], function (Schema, doh) {

	var attribute = {
		"code": "date",
		"editor": "tab",
		"attributes": [
			{
				"code": "code",
				"type": "string",
				"required": true
			},
			{
				"code": "type",
				"type": "string",
				"visible": false,
				"required": true,
				"values": ["date"]
			}
		]

	};

	var group = {
		editor: "gg",
		attributes: attribute.attributes
	};


	var groupGroups = {
		groups: [
			group
		]
	};


	doh.register("schema", [
		function testAttribute() {
			var schema = new Schema();
			var model = schema.prepare([attribute]);
			doh.assertEqual(1, model[0].props.length);
		}, function testAttributeWithGroup() {
			var schema = new Schema();
			var model = schema.transformGroup(group);
			doh.assertEqual(1, model.length);
		}, function testAttributeWithGroupGroups() {
			var schema = new Schema();
			var model = schema.transformGroup(groupGroups);
			doh.assertEqual(1, model.length);
		}
	]);


})
;

