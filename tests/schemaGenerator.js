define(["doh/runner", "gform/schema/SchemaGenerator", "dojo/when"], function (doh, SchemaGenerator, when) {

    var schemaGenerator = new SchemaGenerator();



    doh.register("gform-schemaGenerator", [
        function testSchema() {
            var result=schemaGenerator.loadDefault("../schema/");
            when(result).then(function(value) {
                console.log("done");
            });
        }
    ]);


});



