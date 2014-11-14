define([


    './primitive/ace/AceTextAttributeFactory',
    './primitive/ace/AnyAceAttributeFactory',
    './createLayoutEditorFactory'
], function (AceTextAttributeFactory, AnyAceAttributeFactory, createLayoutEditorFactory) {
// module:
//		gform/createStandardEditorFactory

	return function () {
		var editorFactory = new createLayoutEditorFactory();

		var attributeFactoryFinder = editorFactory.get("attributeFactoryFinder");


		var anyAF = new AnyAceAttributeFactory({editorFactory: editorFactory});
		attributeFactoryFinder.attributeFactories.splice(0,0,anyAF);


		attributeFactoryFinder.addAttributeFactory(new AceTextAttributeFactory({editorFactory: editorFactory}));
        return editorFactory;
    };

});
