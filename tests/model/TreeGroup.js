define([
    '../../createStandardEditorFactory',
    'gform/model/ArrayModel',
    'gform/model/TreeGroup',
    "doh/runner", "gform/model/SingleObject", "gform/model/PrimitiveModel"], function (createStandardEditorFactory, ArrayModel, TreeGroup, doh, SingleObject, PrimitiveModel) {

    var type =
    {
        editor: "tree",
        nodeAttributes: [
            {
                code: "children", type: "array",
                group: {
                    attributes: [{
                        code: "name", type: "string"
                    }]
                }
            }
        ],
        detailGroup: {
            attributes: [{code: "text", type: "string"}]
        }


    };


    var object = {
        children: [{name: "will"}, {name: "smith"}],
        numberP: 23
    };


    var ef = createStandardEditorFactory();

    var treeGroup = ef.createGroupModel(type);
    treeGroup.init();


    doh.register("TreeGroup", [
        function testChildNodes() {

            treeGroup.update(object);
            var attributes = treeGroup.getChildNodes();
            var children = treeGroup.getChildNodes();
            doh.assertEqual(2, children.length);
        },
        function testGetDetailSchema() {

            treeGroup.update(object);
            var attributes = treeGroup.getChildNodes();
            var children = treeGroup.getChildNodes(attributes[0]);

            doh.assertEqual("name", children[0].schema.attributes[0].code);
        }
    ]);


});

