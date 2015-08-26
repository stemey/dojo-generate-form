define([
    './list_primitive/QueryRefListAttributeFactory',
    './group/TreeGroupFactory',
    './converter/isoDateConverter',
	"./EditorFactory",
    "./createActionFactory",
    "./AttributeFactoryFinder",
    "./group/GroupFactory",
    "./group/ListPaneGroupFactory",
    "./group/TabGroupFactory",
    "./group/TitlePaneGroupFactory",
    "./group/ListGroupFactory",
    "./list_primitive/PrimitiveListAttributeFactory",
    "./list_primitive/RefListAttributeFactory",
    "./primitive/StringAttributeFactory",
    "./primitive/ReferenceAttributeFactory",
    "./primitive/MultiReferenceAttributeFactory",
    "./primitive/BooleanAttributeFactory",
    "./primitive/SelectAttributeFactory",
    "./primitive/SelectStoreAttributeFactory",
    "./primitive/CheckedSelectAttributeFactory",
    "./primitive/MappedCheckedMultiSelectAttributeFactory",
    "./primitive/CheckedMultiSelectAttributeFactory",
    "./primitive/MappedSelectAttributeFactory",
    "./primitive/DateAttributeFactory",
    "./primitive/TimeAttributeFactory",
    "./embedded/EmbeddedAttributeFactory",
    "./embedded/MultiEmbeddedAttributeFactory",
    "./primitive/NumberAttributeFactory",
    "./primitive/CurrencyAmountAttributeFactory",
    "./primitive/binary/BinaryAttributeFactory",
    "./primitive/AnyTextAreaAttributeFactory",
//"./primitive/MappedContentPaneFactory",
    "./primitive/TextareaAttributeFactory",
    "./primitive/RichtextAttributeFactory",
    "./primitive/SimpleTextareaAttributeFactory",
//"./group/AttributeListWidget",
    "./group/ColumnsGroupFactory",
    "./group/SingleAttributeGroupFactory",
	"./group/VerticalGroupFactory",
    "./list_embedded/RepeatedEmbeddedAttributeFactory",
    "./list_embedded/RepeatedMultiEmbeddedAttributeFactory",
    "./map_embedded/RepeatedEmbeddedAttributeFactory",
    "./map_primitive/PrimitiveMapAttributeFactory",
    "./list_table/RepeatedEmbeddedAttributeFactory",
    "./list_table/RepeatedSingleEmbeddedAttributeFactory"//

], function (QueryRefListAttributeFactory, TreeGroupFactory, isoDateConverter, EditorFactory, createActionFactory, AttributeFactoryFinder, GroupFactory, ListPaneGroupFactory, TabGroupFactory, //
             TitlePaneGroupFactory, ListGroupFactory, PrimitiveListAttributeFactory, RefListAttributeFactory, StringAttributeFactory, ReferenceAttributeFactory, MultiReferenceAttributeFactory, BooleanAttributeFactory, SelectAttributeFactory, SelectStoreAttributeFactory, CheckedSelectAttributeFactory, MappedCheckedMultiSelectAttributeFactory, CheckedMultiSelectAttributeFactory, MappedSelectAttributeFactory, DateAttributeFactory, TimeAttributeFactory, EmbeddedAttributeFactory, MultiEmbeddedAttributeFactory, NumberAttributeFactory, CurrencyAmountAttributeFactory, BinaryAttributeFactory, AnyTextAreaAttributeFactory, //MappedContentPaneFactory,
             TextareaAttributeFactory, RichtextAttributeFactory, SimpleTextareaAttributeFactory, //		AttributeListWidget,
             ColumnsGroupFactory, SingleAttributeGroupFactory, VerticalGroupFactory, RepeatedEmbeddedAttributeFactory, RepeatedMultiEmbeddedAttributeFactory, PrimitiveMapAttributeFactory, MapEmbeddedAttributeFactory, MultiTableAttributeFactory, TableAttributeFactory) {
// module:
//		gform/createStandardEditorFactory

    return function () {
        // summary:
        //		StandardEditorFactory will created simple list as default group.
        // returns: gform/EditorFactory
        //		return the new editorFactory instance.
        var editorFactory = new EditorFactory();
        editorFactory.addGroupFactory("list", new GroupFactory({editorFactory: editorFactory}));
        editorFactory.addGroupFactory("listpane", new ListPaneGroupFactory({editorFactory: editorFactory}));
        editorFactory.addGroupFactory("listgroup", new ListGroupFactory({editorFactory: editorFactory}));
        editorFactory.addGroupFactory("tab", new TabGroupFactory({editorFactory: editorFactory}));
        editorFactory.addGroupFactory("titlepane", new TitlePaneGroupFactory({editorFactory: editorFactory}));
        editorFactory.addGroupFactory("columnsgroup", new ColumnsGroupFactory({editorFactory: editorFactory}));
        editorFactory.addGroupFactory("single", new SingleAttributeGroupFactory({editorFactory: editorFactory}));
		editorFactory.addGroupFactory("verticalgroup", new VerticalGroupFactory({editorFactory: editorFactory}));
        editorFactory.addGroupFactory("tree", new TreeGroupFactory({editorFactory: editorFactory}));

        editorFactory.set("defaultGroupFactory", new GroupFactory({editorFactory: editorFactory}));

        editorFactory.actionFactory = createActionFactory();

        var attributeFactoryFinder = new AttributeFactoryFinder({
            editorFactory: editorFactory
        });

        var attributeFactories = [ //
            new RepeatedEmbeddedAttributeFactory({editorFactory: editorFactory}),
            new RepeatedMultiEmbeddedAttributeFactory({editorFactory: editorFactory}),
            new MultiTableAttributeFactory({editorFactory: editorFactory}),
            new TableAttributeFactory({editorFactory: editorFactory}),
            new MapEmbeddedAttributeFactory({editorFactory: editorFactory}),
            new PrimitiveMapAttributeFactory({editorFactory: editorFactory}),
            new EmbeddedAttributeFactory({editorFactory: editorFactory}),
            new MultiEmbeddedAttributeFactory({editorFactory: editorFactory}),
            new MappedCheckedMultiSelectAttributeFactory({editorFactory: editorFactory}),
            new CheckedMultiSelectAttributeFactory({editorFactory: editorFactory}),
            new MappedSelectAttributeFactory({editorFactory: editorFactory}),
            new RefListAttributeFactory({editorFactory: editorFactory}),
            new PrimitiveListAttributeFactory({editorFactory: editorFactory}),
            new ReferenceAttributeFactory({editorFactory: editorFactory}),
            new MultiReferenceAttributeFactory({editorFactory: editorFactory}),
            new NumberAttributeFactory({editorFactory: editorFactory}),
            new SelectAttributeFactory({editorFactory: editorFactory}),
            new SelectStoreAttributeFactory({editorFactory: editorFactory}),
            new BooleanAttributeFactory({editorFactory: editorFactory}),
            new BinaryAttributeFactory({editorFactory: editorFactory}),
            new StringAttributeFactory({editorFactory: editorFactory}),
            new DateAttributeFactory({editorFactory: editorFactory}),
            new TimeAttributeFactory({editorFactory: editorFactory}),
            new AnyTextAreaAttributeFactory({editorFactory: editorFactory})
            //	       				new MappedContentPaneFactory({editorFactory:editorFactory}) //
        ];
        attributeFactoryFinder.addAttributeFactory(new MultiTableAttributeFactory({editorFactory: editorFactory}));
        attributeFactoryFinder.addAttributeFactory(new PrimitiveListAttributeFactory({editorFactory: editorFactory}));
//			attributeFactoryFinder.addAttributeFactory("mapped_contentpane", new MappedContentPaneFactory({editorFactory:editorFactory}));
        attributeFactoryFinder.addAttributeFactory(new CurrencyAmountAttributeFactory({editorFactory: editorFactory}));
        attributeFactoryFinder.addAttributeFactory(new CheckedSelectAttributeFactory({editorFactory: editorFactory}));
        attributeFactoryFinder.addAttributeFactory(new TextareaAttributeFactory({editorFactory: editorFactory}));
        attributeFactoryFinder.addAttributeFactory(new RichtextAttributeFactory({editorFactory: editorFactory}));
        //attributeFactoryFinder.addAttributeFactory(new AceTextAttributeFactory({editorFactory: editorFactory}));
        attributeFactoryFinder.addAttributeFactory(new SimpleTextareaAttributeFactory({editorFactory: editorFactory}));
        attributeFactoryFinder.addAttributeFactory(new QueryRefListAttributeFactory({editorFactory: editorFactory}));
        attributeFactoryFinder.set("attributeFactories", attributeFactories);

        editorFactory.set("attributeFactoryFinder", attributeFactoryFinder);

		editorFactory.addConverterForType(isoDateConverter,"date");

        return editorFactory;
    };

});
