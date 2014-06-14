define(['dojo/_base/declare',
    "doh/runner",
    "../EditorFactory"
], function (declare, doh, EditorFactory) {

    var ConstructorValidator = declare([],
        {
            constructor: function (kwArgs) {
                this.args = kwArgs;
            },
            validate: function () {
                return true;
            }
        }
    );

    var FactoryValidator = function (args) {
        return args;
    };

    doh.register("gform-EditorFactory", [
        function testCtrValidators() {
            var ef = new EditorFactory();
            ef.addCtrValidator("ex", ConstructorValidator);
            var validators = ef.getModelValidators({ex: {value: 12}});
            doh.assertEqual(1, validators.length);
            doh.assertEqual(12, validators[0].args.value);
        },
        function testFactoryValidators() {
            var ef = new EditorFactory();
            ef.addValidator("ex", FactoryValidator);
            var validators = ef.getModelValidators({ex: {value: 12}});
            doh.assertEqual(1, validators.length);
            doh.assertEqual(12, validators[0].value);
        }
    ]);

});