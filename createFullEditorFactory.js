define([


    './primitive/ace/AceTextAttributeFactory',
    './createLayoutEditorFactory'
], function (AceTextAttributeFactory, createLayoutEditorFactory) {
// module:
//		gform/createStandardEditorFactory

    var editorFactory = new createLayoutEditorFactory();

    var attributeFactoryFinder = editorFactory.get("attributeFactoryFinder");
    attributeFactoryFinder.addAttributeFactory(new AceTextAttributeFactory({editorFactory: editorFactory}));
    return function () {
        // summary:
        //		StandardEditorFactory will created simple list as default group.
        // returns: gform/EditorFactory
        //		return the cached editorFactory instance.
        return editorFactory;
    };

});
