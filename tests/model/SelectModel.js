define([
    "gform/model/SingleObject",
    "doh/runner",
    "gform/model/SelectModel"
], function (SingleObject, doh, SelectModel) {


    var schema = {attributes: [
        {
            "code": "first",
            required:true
        }
    ]};

    var ef = {
        createAttributeModel: function (meta) {
            return new SelectModel({schema:meta,options: [
                {value: "1"},
                {value: "2"}
            ]});
        }
    };

    var o = new SingleObject({schema: schema, editorFactory: ef});

    doh.register("SelectModel", [
        function testInvalid() {
            o.update({"first": "x"});
            doh.assertEqual("1", o.getModelByPath("first").getPlainValue());
        }, function testDefault() {
            o.update({});
            doh.assertEqual("1", o.getModelByPath("first").getPlainValue());
            doh.assertEqual(0, o.getModelByPath("first").incompleteCount);
        }, function testValid() {
            o.update({"first": "2"});
            doh.assertEqual("2", o.getModelByPath("first").getPlainValue());
        }
    ]);


});

