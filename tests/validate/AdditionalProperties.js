define([
    "../../validate/AdditionalProperties",
    "doh/runner"
], function (AdditionalProperties, doh) {

    var additionalProperties = AdditionalProperties({"code": "addProp"});


    var modelFactory = function (value) {
        return {
            schema: {attributes: [
                {code: "invalid"}
            ]},
            getModelByPath: function (prop) {
                if (prop !== "addProp") {
                    throw new "expected to call 'addProp'";
                } else {
                    return {
                        getPlainValue: function () {
                            return value;
                        }
                    }
                }
            }
        };
    };

    doh.register("AdditionalProperties", [
        function testNumber() {
            var errors = additionalProperties(modelFactory(1));
            doh.assertEqual(1, errors.length);
        }, function testArray() {
            var errors = additionalProperties(modelFactory([7]));
            doh.assertEqual(1, errors.length);
        }, function testBoolean() {
            var errors = additionalProperties(modelFactory(true));
            doh.assertEqual(1, errors.length);
        }, function testString() {
            var errors = additionalProperties(modelFactory("dd"));
            doh.assertEqual(1, errors.length);
        }, function testString() {
            var errors = additionalProperties(modelFactory("dd"));
            doh.assertEqual(1, errors.length);
        }, function testInvalidAttribute() {
            var errors = additionalProperties(modelFactory({invalid: false}));
            doh.assertEqual(1, errors.length);
        }, function testValidAttribute() {
            var errors = additionalProperties(modelFactory({valid: true}));
            doh.assertEqual(0, errors.length);
        }
    ]);


});

