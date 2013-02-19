define([ 
"./EditorFactory", //
"./AttributeFactoryFinder",//
"./group/GroupFactory",//
"./group/ListPaneGroupFactory",//
"./group/TabGroupFactory",//
"./group/TitlePaneGroupFactory",//
"./group/ListGroupFactory"//
], function(EditorFactory,AttributeFactoryFinder, GroupFactory, ListPaneGroupFactory, TabGroupFactory, //
		TitlePaneGroupFactory, ListGroupFactory) {

	return create() {
			var editorFactory = new EditorFactory();
			editorFactory.addGroupFactory("list", new GroupFactory());
			editorFactory.addGroupFactory("listpane", new ListPaneGroupFactory());
			editorFactory.addGroupFactory("listgroup", new ListGroupFactory());
			editorFactory.addGroupFactory("tab", new TabGroupFactory());
			editorFactory.addGroupFactory("titlepane", new TitlePaneGroupFactory());
			editorFactory.setDefaultGroupFactory("list");

			var attributeFactoryFinder = new AttributeFactoryFinder({
				editorFactory : editorFactory
			});

			var attributeFactories = [ //
			       				new RepeatedEmbeddedAttributeFactory({editorFactory:this.editorFactory}),//
			       				new EmbeddedAttributeFactory({editorFactory:this.editorFactory}),//
			       				new MappedCheckedMultiSelectAttributeFactory({editorFactory:this.editorFactory}), // 
			       				new CheckedMultiSelectAttributeFactory({editorFactory:this.editorFactory}), // 
			       				new MappedSelectAttributeFactory({editorFactory:this.editorFactory}),//
			       				new PrimitiveListAttributeFactory({editorFactory:this.editorFactory}),//
			       				new NumberAttributeFactory({editorFactory:this.editorFactory}),//
			       				new SelectAttributeFactory({editorFactory:this.editorFactory}), // 
			       				new BooleanAttributeFactory({editorFactory:this.editorFactory}), // 
			       				new StringAttributeFactory({editorFactory:this.editorFactory}), //
			       				new DateAttributeFactory({editorFactory:this.editorFactory}), //
			       				new TimeAttributeFactory({editorFactory:this.editorFactory}), //
			       				new MappedContentPaneFactory({editorFactory:this.editorFactory}) //
			       				];
			attributeFactoryFinder.set("attributeFactories",attributeFactories);
			attributeFactoryFinder.addAttributeFactory("table", new TableListAttributeFactory({editorFactory:this.editorFactory}));
			attributeFactoryFinder.addAttributeFactory("primitive_list", new PrimitiveListAttributeFactory({editorFactory:this.editorFactory}));
			attributeFactoryFinder.addAttributeFactory("mapped_contentpane", new MappedContentPaneFactory({editorFactory:this.editorFactory}));
			attributeFactoryFinder.addAttributeFactory("currencyamount", new CurrencyAmountAttributeFactory({editorFactory:this.editorFactory}));
			attributeFactoryFinder.addAttributeFactory("checked_select",new CheckedSelectAttributeFactory({editorFactory:this.editorFactory}));


			editorFactory.set("attributeFactoryFinder",attributeFactoryFinder);			

			

		}
});
