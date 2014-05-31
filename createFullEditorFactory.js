define([


    './primitive/ace/AceTextAttributeFactory',
    './primitive/ace/AnyAceAttributeFactory',
    './createLayoutEditorFactory'
], function (AceTextAttributeFactory, AnyAceAttributeFactory, createLayoutEditorFactory) {
// module:
//		gform/createStandardEditorFactory

    var editorFactory = new createLayoutEditorFactory();

    var attributeFactoryFinder = editorFactory.get("attributeFactoryFinder");


    var anyAF = new AnyAceAttributeFactory({editorFactory: editorFactory});
    attributeFactoryFinder.attributeFactories.splice(0,0,anyAF);


    attributeFactoryFinder.addAttributeFactory(new AceTextAttributeFactory({editorFactory: editorFactory}));
    return function () {
        // summary:
        //		StandardEditorFactory will created simple list as default group.
        // returns: gform/EditorFactory
        //		return the cached editorFactory instance.
        return editorFactory;
    };

});
