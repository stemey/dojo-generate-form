define(["doh/runner",'gform/schema/Transformer'], function (doh,Transformer) {


    var t = new Transformer();
    t.replace("/replace","/new");
    t.add({
        id:"t1",
        execute: function(value) {
            return value.name;
        }
    });


	doh.register("Transformer", [
		function testGetUrlForRefReplace() {
            var url = t.getUrlForRef("https://dd/","replace?x=1");
            doh.assertEqual("https://dd/new?x=1", url);
		},
        function testGetUrlForRefNoReplace() {
            var url = t.getUrlForRef("/","xx");
            doh.assertEqual("/xx", url);
        },
        function testTransformObject() {
            var transformed = t.transformObject("pp?transforms=t1",{name:"Willi"});
            doh.assertEqual("Willi", transformed);
        },
        function testTransformObject() {
            var transformed = t.transformObject("pp",{name:"Willi"});
            doh.assertEqual("Willi", transformed.name);
        }

	]);

});

