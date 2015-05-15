define([
    'gform/model/SingleObject',
    'gform/model/PrimitiveModel',
    "doh/runner",
    "gform/model/MappedSelectModel"
], function (SingleObject, PrimitiveModel, doh, MappedSelectModel) {


    var mappedValues = {"x": [
        {value: "1"},
        {value: "2"}
    ], "y": [
        {value: "2"},
        {value: "3"}
    ]};

    var ef = {
        createAttributeModel: function (schema) {
			var m;
            if (schema.mappedAttribute) {
                m= MappedSelectModel({schema: schema, mappedAttribute: schema.mappedAttribute, mappedValues: schema.mappedValues});
            } else {
                m= new PrimitiveModel({schema: schema});
            }
			return m;
        }
    };

    var schema = {
        attributes: [
            {code: "first", type: "string"},
            {code: "second", type: "string", mappedAttribute: "first", mappedValues: mappedValues, required:true}
        ]
    };
    var o = new SingleObject({schema: schema, editorFactory:ef});
    o.init();

    doh.register("MappedSelectModel", [
        function testDefault() {
            o.update({"first": "x"});
            doh.assertEqual("1", o.getModelByPath("second").getPlainValue());
        }, function testNoMapping() {
            o.update({"first": "z"});
            doh.assertEqual(null, o.getModelByPath("second").getPlainValue());
        }, function testCorrectMapping() {
            o.update({"first": "x", "second": "2"});
            doh.assertEqual("2", o.getModelByPath("second").getPlainValue());
        }, function testCommonMapping() {
            o.update({"first": "x", "second": "2"});
            o.getModelByPath("first").set("value", "y");
            doh.assertEqual("2", o.getModelByPath("second").getPlainValue());
        }
    ]);


});

