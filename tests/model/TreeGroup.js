define([
    '../../createStandardEditorFactory',
    'gform/model/ArrayModel',
    'gform/model/TreeGroup',
    "doh/runner", "gform/model/SingleObject", "gform/model/PrimitiveModel"], function (createStandardEditorFactory, ArrayModel, TreeGroup, doh, SingleObject, PrimitiveModel) {

    var type =
    {
        groups: [
            {
                attributes: [
                    {
                        code: "children", type: "array",
                        group: {
                            attributes: [{
                                code: "name", type: "string"
                            }]
                        }
                    }
                ]
            }
        ]
    };




    var object = {
        children: [{numberP: 1}, {numberP: 2}],
        numberP: 23
    };


    var ef = createStandardEditorFactory();

    var nodeAttribute = ef.createGroupModel(type.groups[0]);

    var treeGroup = new TreeGroup();
    treeGroup.schema=type;
    treeGroup.groups= [nodeAttribute];
    treeGroup.init();



        doh.register("TreeGroup", [
            function testAttributeNodes() {

                treeGroup.update(object);
                var children = treeGroup.getChildNodes();
                doh.assertEqual(1, children.length);
            },
            function testChildNodes() {

                treeGroup.update(object);
                var attributes = treeGroup.getChildNodes();
                var children = treeGroup.getChildNodes(attributes[0]);
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

