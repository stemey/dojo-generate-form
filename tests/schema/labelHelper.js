define(["doh/runner",'gform/schema/labelHelper'], function (doh,labelHelper) {




	doh.register("labelHelper", [
		function testGetSpecialLabel() {
            var a = labelHelper.getLabelAttribute({labelAttribute:"x"});
            doh.assertEqual("x", a);
		},
        function testGetLabelInGroups() {
            var a = labelHelper.getLabelAttribute({groups:[{attributes:[{code:"xx",type:"number"},{code:"x",type:"string"}]}]});
            doh.assertEqual("x", a);
        },
        function testGetLabelInObject() {
            var a = labelHelper.getLabelAttribute({attributes:[{code:"xx",type:"number"},{code:"x",type:"string"}]});
            doh.assertEqual("x", a);
        }

	]);

});

