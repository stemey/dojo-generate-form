define([ 
"dojo/_base/lang",//
"../EditorFactory", //
"../AttributeFactoryFinder",//
"./group/FieldsetGroupFactory",//
"./decorator/DecoratorFactory",//
"./primitive/StringAttributeFactory",//
"./primitive/BooleanAttributeFactory",//
"./primitive/DatePickerAttributeFactory",//
"./list_primitive/PrimitiveListAttributeFactory"
], function(lang,EditorFactory,AttributeFactoryFinder, FieldsetGroupFactory, DecoratorFactory, StringAttributeFactory, BooleanAttributeFactory, DatePickerAttributeFactory, PrimitiveListAttributeFactory) {
// module:
//		gform/createLayoutEditorFactory

			var editorFactory = new EditorFactory();
			editorFactory.addGroupFactory("list", new FieldsetGroupFactory({editorFactory:editorFactory}));
			editorFactory.set("defaultGroupFactory",new FieldsetGroupFactory({editorFactory:editorFactory}));

			var attributeFactoryFinder = new AttributeFactoryFinder({
				editorFactory : editorFactory
			});

			var attributeFactories = [ //
										new PrimitiveListAttributeFactory({editorFactory:editorFactory}),//
			       				new StringAttributeFactory({editorFactory:editorFactory}), //
			       				new DatePickerAttributeFactory({editorFactory:editorFactory}), //
										new BooleanAttributeFactory({editorFactory:editorFactory}),//
			       				];
			attributeFactoryFinder.attributeFactories=attributeFactories;
			editorFactory.set("attributeFactoryFinder",attributeFactoryFinder);
			editorFactory.decoratorFactory=new DecoratorFactory();
		
			return function() {
				// summary:
				//		LayoutEditorFactory will created ListPanes as default group. These work well in LayoutContainers
				// returns: gform/EditorFactory
				//		return the cached editorFactory instance.
				return editorFactory;
			}				

});
