define([ 
"dojo/_base/lang",//
"./EditorFactory", //
"./AttributeFactoryFinder",//
"./group/GroupFactory",//
"./group/ListPaneGroupFactory",//
"./group/TabGroupFactory",//
"./group/TitlePaneGroupFactory",//
"./group/ListGroupFactory",//
"./list_primitive/PrimitiveListAttributeFactory",//
"./list_primitive/RefListAttributeFactory",//
"./primitive/StringAttributeFactory",//
"./primitive/BooleanAttributeFactory",//
"./primitive/SelectAttributeFactory",//
"./primitive/CheckedSelectAttributeFactory",//
"./primitive/MappedCheckedMultiSelectAttributeFactory",//
"./primitive/CheckedMultiSelectAttributeFactory",//
"./primitive/MappedSelectAttributeFactory",//
"./primitive/DateAttributeFactory",//
"./primitive/TimeAttributeFactory",//
"./embedded/EmbeddedAttributeFactory",//
"./primitive/TextareaAttributeFactory",//
"./primitive/SimpleTextareaAttributeFactory",//
"./primitive/NumberAttributeFactory",//
"./primitive/CurrencyAmountAttributeFactory",//
"./primitive/MappedContentPaneFactory",//
"./primitive/ReferenceAttributeFactory",//
"./group/AttributeListWidget",//
"./group/ColumnsGroupFactory",//
"./map_embedded/RepeatedEmbeddedAttributeFactory",//
"./list_embedded/RepeatedEmbeddedAttributeFactory",//,
"./list_table/RepeatedEmbeddedAttributeFactory"

], function(lang,EditorFactory,AttributeFactoryFinder, GroupFactory, ListPaneGroupFactory, TabGroupFactory, //
		TitlePaneGroupFactory, ListGroupFactory,PrimitiveListAttributeFactory, RefListAttributeFactory, StringAttributeFactory,
		BooleanAttributeFactory, SelectAttributeFactory, CheckedSelectAttributeFactory, 
		MappedCheckedMultiSelectAttributeFactory,
		CheckedMultiSelectAttributeFactory, MappedSelectAttributeFactory, DateAttributeFactory, 
		TimeAttributeFactory, EmbeddedAttributeFactory, TextareaAttributeFactory, SimpleTextareaAttributeFactory, NumberAttributeFactory, 
		CurrencyAmountAttributeFactory, MappedContentPaneFactory, ReferenceAttributeFactory,
		AttributeListWidget, ColumnsGroupFactory, MapAttributeFactory, RepeatedEmbeddedAttributeFactory, TableListAttributeFactory) {
// module:
//		gform/createLayoutEditorFactory

			var editorFactory = new EditorFactory();
			editorFactory.addGroupFactory("list", new GroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("listpane", new ListPaneGroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("listgroup", new ListGroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("tab", new TabGroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("titlepane", new TitlePaneGroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("columnsgroup", new ColumnsGroupFactory({editorFactory:editorFactory}));
			editorFactory.set("defaultGroupFactory",new ListPaneGroupFactory({editorFactory:editorFactory}));

			var attributeFactoryFinder = new AttributeFactoryFinder({
				editorFactory : editorFactory
			});

			var attributeFactories = [ //
			       				new RepeatedEmbeddedAttributeFactory({editorFactory:editorFactory}),//
			       				new MapAttributeFactory({editorFactory:editorFactory}),//
			       				new EmbeddedAttributeFactory({editorFactory:editorFactory}),//
			       				new MappedCheckedMultiSelectAttributeFactory({editorFactory:editorFactory}), // 
			       				new CheckedMultiSelectAttributeFactory({editorFactory:editorFactory}), // 
			       				new MappedSelectAttributeFactory({editorFactory:editorFactory}),//
			       				new RefListAttributeFactory({editorFactory:editorFactory}),//
			       				new PrimitiveListAttributeFactory({editorFactory:editorFactory}),//
			       				new NumberAttributeFactory({editorFactory:editorFactory}),//
			       				new ReferenceAttributeFactory({editorFactory:editorFactory}), //
			       				new SelectAttributeFactory({editorFactory:editorFactory}), // 
			       				new BooleanAttributeFactory({editorFactory:editorFactory}), // 
			       				new StringAttributeFactory({editorFactory:editorFactory}), //
			       				new DateAttributeFactory({editorFactory:editorFactory}), //
			       				new TimeAttributeFactory({editorFactory:editorFactory}), //
			       				new MappedContentPaneFactory({editorFactory:editorFactory}) //
			       				];
			attributeFactoryFinder.addAttributeFactory("table", new TableListAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("primitive_list", new PrimitiveListAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("mapped_contentpane", new MappedContentPaneFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("currencyamount", new CurrencyAmountAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("textarea", new TextareaAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("simpletextarea", new SimpleTextareaAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("checked_select",new CheckedSelectAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.set("attributeFactories",attributeFactories);

			editorFactory.set("attributeFactoryFinder",attributeFactoryFinder);
		
			return function() {
				// summary:
				//		LayoutEditorFactory will created ListPanes as default group. These work well in LayoutContainers
				// returns: gform/EditorFactory
				//		return the cached editorFactory instance.
				return editorFactory;
			}				

});
