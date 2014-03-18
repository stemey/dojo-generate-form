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
	"./primitive/ReferenceAttributeFactory",//
    "./primitive/MultiReferenceAttributeFactory",//
	"./primitive/BooleanAttributeFactory",//
	"./primitive/SelectAttributeFactory",//
	"./primitive/CheckedSelectAttributeFactory",//
	"./primitive/MappedCheckedMultiSelectAttributeFactory",//
	"./primitive/CheckedMultiSelectAttributeFactory",//
	"./primitive/MappedSelectAttributeFactory",//
	"./primitive/DateAttributeFactory",//
	"./primitive/TimeAttributeFactory",//
	"./embedded/EmbeddedAttributeFactory",//
	"./embedded/MultiEmbeddedAttributeFactory",//
	"./primitive/NumberAttributeFactory",//
	"./primitive/CurrencyAmountAttributeFactory",//
//"./primitive/MappedContentPaneFactory",//
	"./primitive/TextareaAttributeFactory",//
	"./primitive/SimpleTextareaAttributeFactory",//
//"./group/AttributeListWidget",//
	"./group/ColumnsGroupFactory",//
	"./list_embedded/RepeatedEmbeddedAttributeFactory",//
	"./list_embedded/RepeatedMultiEmbeddedAttributeFactory",//
	"./map_embedded/RepeatedEmbeddedAttributeFactory",//
	"./map_primitive/PrimitiveMapAttributeFactory",//
	"./list_table/RepeatedEmbeddedAttributeFactory",//
	"./list_table/RepeatedSingleEmbeddedAttributeFactory"//

], function (lang, EditorFactory, AttributeFactoryFinder, GroupFactory, ListPaneGroupFactory, TabGroupFactory, //
			 TitlePaneGroupFactory, ListGroupFactory, PrimitiveListAttributeFactory, RefListAttributeFactory, StringAttributeFactory, ReferenceAttributeFactory, MultiReferenceAttributeFactory, BooleanAttributeFactory, SelectAttributeFactory, CheckedSelectAttributeFactory, MappedCheckedMultiSelectAttributeFactory, CheckedMultiSelectAttributeFactory, MappedSelectAttributeFactory, DateAttributeFactory, TimeAttributeFactory, EmbeddedAttributeFactory, MultiEmbeddedAttributeFactory, NumberAttributeFactory, CurrencyAmountAttributeFactory, //MappedContentPaneFactory,
			 TextareaAttributeFactory, SimpleTextareaAttributeFactory, //		AttributeListWidget,
			 ColumnsGroupFactory, RepeatedEmbeddedAttributeFactory, RepeatedMultiEmbeddedAttributeFactory, PrimitiveMapAttributeFactory, MapEmbeddedAttributeFactory, MultiTableAttributeFactory, TableAttributeFactory) {
// module:
//		gform/createStandardEditorFactory

	var editorFactory = new EditorFactory();
	editorFactory.addGroupFactory("list", new GroupFactory({editorFactory: editorFactory}));
	editorFactory.addGroupFactory("listpane", new ListPaneGroupFactory({editorFactory: editorFactory}));
	editorFactory.addGroupFactory("listgroup", new ListGroupFactory({editorFactory: editorFactory}));
	editorFactory.addGroupFactory("tab", new TabGroupFactory({editorFactory: editorFactory}));
	editorFactory.addGroupFactory("titlepane", new TitlePaneGroupFactory({editorFactory: editorFactory}));
	editorFactory.addGroupFactory("columnsgroup", new ColumnsGroupFactory({editorFactory: editorFactory}));
	editorFactory.set("defaultGroupFactory", new ListPaneGroupFactory({editorFactory: editorFactory}));

	var attributeFactoryFinder = new AttributeFactoryFinder({
		editorFactory: editorFactory
	});

	var attributeFactories = [ //
		new RepeatedEmbeddedAttributeFactory({editorFactory: editorFactory}),//
		new RepeatedMultiEmbeddedAttributeFactory({editorFactory: editorFactory}),//
		new MultiTableAttributeFactory({editorFactory: editorFactory}),//
		new TableAttributeFactory({editorFactory: editorFactory}),//
		new MapEmbeddedAttributeFactory({editorFactory: editorFactory}),//
		new PrimitiveMapAttributeFactory({editorFactory: editorFactory}),//
		new EmbeddedAttributeFactory({editorFactory: editorFactory}),//
		new MultiEmbeddedAttributeFactory({editorFactory: editorFactory}),//
		new MappedCheckedMultiSelectAttributeFactory({editorFactory: editorFactory}), //
		new MappedSelectAttributeFactory({editorFactory: editorFactory}),//
		new CheckedMultiSelectAttributeFactory({editorFactory: editorFactory}), //
		new RefListAttributeFactory({editorFactory: editorFactory}),//
		new PrimitiveListAttributeFactory({editorFactory: editorFactory}),//
		new ReferenceAttributeFactory({editorFactory: editorFactory}),//
        new MultiReferenceAttributeFactory({editorFactory: editorFactory}),//
		new NumberAttributeFactory({editorFactory: editorFactory}),//
		new SelectAttributeFactory({editorFactory: editorFactory}), //
		new BooleanAttributeFactory({editorFactory: editorFactory}), //
		new StringAttributeFactory({editorFactory: editorFactory}), //
		new DateAttributeFactory({editorFactory: editorFactory}), //
		new TimeAttributeFactory({editorFactory: editorFactory}) //
		//	       				new MappedContentPaneFactory({editorFactory:editorFactory}) //
	];
	attributeFactoryFinder.addAttributeFactory(new MultiTableAttributeFactory({editorFactory: editorFactory}));
	attributeFactoryFinder.addAttributeFactory(new TableAttributeFactory({editorFactory: editorFactory}));
	attributeFactoryFinder.addAttributeFactory(new PrimitiveListAttributeFactory({editorFactory: editorFactory}));
//			attributeFactoryFinder.addAttributeFactory("mapped_contentpane", new MappedContentPaneFactory({editorFactory:editorFactory}));
	attributeFactoryFinder.addAttributeFactory(new CurrencyAmountAttributeFactory({editorFactory: editorFactory}));
	attributeFactoryFinder.addAttributeFactory(new CheckedSelectAttributeFactory({editorFactory: editorFactory}));
	attributeFactoryFinder.addAttributeFactory(new TextareaAttributeFactory({editorFactory: editorFactory}));
    //attributeFactoryFinder.addAttributeFactory(new AceTextAttributeFactory({editorFactory: editorFactory}));
	attributeFactoryFinder.addAttributeFactory(new SimpleTextareaAttributeFactory({editorFactory: editorFactory}));
	attributeFactoryFinder.set("attributeFactories", attributeFactories);

	editorFactory.set("attributeFactoryFinder", attributeFactoryFinder);

	return function () {
		// summary:
		//		StandardEditorFactory will created simple list as default group.
		// returns: gform/EditorFactory
		//		return the cached editorFactory instance.
		return editorFactory;
	};

});
