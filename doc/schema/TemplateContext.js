define(["dojo/_base/declare"  ],
	function (declare) {


		return declare("gform.doc.Context", [], {
			getObject: function (key, value) {
				if (key == "enum" && value.length == 1) {
					return {key: "constant-value", value: value[0]}
				}
				return {key: key, value: value};
			},
			included: function (key, value) {
				return key != "visible";
			}
		});

	});
