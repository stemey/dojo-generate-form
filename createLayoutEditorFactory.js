define([
    "./createStandardEditorFactory",
    "./group/ListPaneGroupFactory"

], function (createStandardEditorFactory, ListPaneGroupFactory) {
// module:
//		gform/createLayoutEditorFactory

    return function () {
        // summary:
        //		LayoutEditorFactory will created a listpane for use in layoutContainer as default group.
        // returns: gform/EditorFactory
        //		return the new editorFactory instance.
        var editorFactory = new createStandardEditorFactory();
        editorFactory.set("defaultGroupFactory", new ListPaneGroupFactory({editorFactory: editorFactory}));

        return editorFactory;
    };

});
