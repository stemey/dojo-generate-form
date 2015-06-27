define(['../../schema/meta',
    'dojo/_base/lang',
    './TypeSelect',
    './AddButton',
    './DeleteButton',
    'gform/Editor',
    './DndSource',
    'dijit/layout/ContentPane',
    'dijit/Toolbar',
    'dojo/aspect',
    '../TreeModel',
    'dijit/Tree',
    'dijit/layout/BorderContainer',
    "dojo/_base/declare"
], function (meta, lang, TypeSelect, AddButton, DeleteButton, Editor, DndSource, ContentPane, Toolbar, aspect, TreeModel, Tree, BorderContainer, declare) {

    return declare([BorderContainer], {
        model: null,
        tree: null,
        editor: null,
        toolbar: null,
        treeModel: null,
        editorFactory: null,
        ctx: null,
        createTree: function (kwArgs) {

            var RtLabelTreeNode = declare(Tree._TreeNode, {
                _setLabelAttr: {node: "labelNode", type: "innerHTML"}
            });
            var args = {
                _createTreeNode: function (args) {
                    return new RtLabelTreeNode(args);
                }
            };
            lang.mixin(args, kwArgs);


            var GformTree = declare([Tree], {
                getIconClass: function (/*dojo.data.Item*/ item, /*Boolean*/ opened) {
                    if (item.getIconClass) {
                        return item.getIconClass();
                    } else if (item.schema && item.schema.iconClass) {
                        return item.schema.iconClass;
                    }
                    return (!item || this.model.mayHaveChildren(item)) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf"
                }
            })

            return new GformTree(args);
        },
        hideEditor: function () {
            this.editor.setMetaAndDefault({attributes: []});
        },
        _build: function () {
            // root is not removable
            this.model.removable = false;
            this.treeModel = new TreeModel({model: this.model});

            this.tree = this.createTree({
                dndController: DndSource,
                region: "left",
                model: this.treeModel
            });

            this.toolbar = new Toolbar({region: "top"});

            this.editor = new Editor({region: "center"});
            this.editor.set("editorFactory", this.editorFactory);
            this.editor.set("ctx", this.ctx);

            var cp = new ContentPane({
                region: "left", splitter: true,
                style: {width: "30%"}
            });
            cp.addChild(this.tree);
            this.addChild(this.toolbar);
            this.addChild(this.editor);
            this.addChild(cp);

            this.own(aspect.after(this.tree, "onLoad", function () {
                var nodes = this.tree.getNodesByItem(this.model);
                this.tree.dndController.setSelection(nodes)
            }.bind(this)));
        },
        onSelectedItems: function () {
            var items = this.tree.get("selectedItems");
            if (items.length == 1) {
                var item = items[0];
                if (item.getDetailModel) {
                    this.editor.setModel(item.getDetailModel());
                } else if (item.schema) {
                    if (meta.isMultiObject(item.schema)) {
                        this.editor.setModel(item.getCurrentGroup());
                    } else {
                        this.editor.setModel(item);
                    }
                } else {
                    this.hideEditor();
                }
            } else {
                this.hideEditor();
            }

        },
        postCreate: function () {

            this._build();
            this._addButtons();

            this.own(this.tree.watch("selectedItems", this.onSelectedItems.bind(this)));

            this.own(aspect.after(this.model, "onChange", function (obj, args) {
                var source = args[1];
                while (source != null && !source.treeId) {
                    source = source.parent;
                }
                if (source != null) {
                    this.treeModel.onChange(source);
                    if (source.getChildNodes) {
                        this.treeModel.onChildrenChange(source, source.getChildNodes());
                    }
                }
            }.bind(this)));
            this.inherited(arguments);

        },
        _addButtons: function () {
            this.toolbar.addChild(new DeleteButton({tree: this.tree, label: "remove"}));
            this.toolbar.addChild(new AddButton({tree: this.tree, label: "add"}));
            this.toolbar.addChild(new TypeSelect({tree: this.tree}));
        }

    });
})

