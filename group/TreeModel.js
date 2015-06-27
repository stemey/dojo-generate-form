define([
    '../schema/labelHelper',
    "dojo/_base/declare",
    "dojo/_base/lang"
], function (labelHelper, declare, lang) {

    // module:
    //		dijit/tree/ObjectStoreModel

    return declare("TreeModel", null, {


        model: null,


        constructor: function (/* Object */ args) {
            // summary:
            //		Passed the arguments listed above (store, etc)
            // tags:
            //		private

            lang.mixin(this, args);

        },


        // =======================================================================
        // Methods for traversing hierarchy

        getRoot: function (onItem, onError) {
            // summary:
            //		Calls onItem with the root item for the tree, possibly a fabricated item.
            //		Calls onError on error.
            onItem(this.model.getRoot());
        },

        mayHaveChildren: function (item) {
            var hasChildren = item == this.model.getRoot() || !!( item.hasChildNodes && item.hasChildNodes());
            return hasChildren;
        },

        getChildren: function (/*Object*/ parentItem, /*function(items)*/ onComplete, /*function*/ onError) {
            // summary:
            //		Calls onComplete() with array of child items of given parent item.
            // parentItem:
            //		Item from the dojo/store
            if (!this.mayHaveChildren(parentItem)) {
                // TODO this is happening at the end of a multiObject drag.
                onComplete(null)
                return;
            }

            var nodes = this._getChildren(parentItem);
            onComplete(nodes);
        },

        _getChildren: function (parentItem) {
            return parentItem.getChildNodes ? parentItem.getChildNodes() : this.model.getChildNodes(parentItem);
        },

        // =======================================================================
        // Inspecting items

        isItem: function (/*===== something =====*/) {
            return true;	// Boolean
        },

        currentTreeId: 1,

        getIdentity: function (/* item */ item) {
            if (!item.treeId) {
                item.treeId = this.currentTreeId++;
            }
            return item.treeId;
        },

        getLabel: function (/*dojo/data/Item*/ item) {
            // summary:
            //		Get the label for an item

            if (item.name) {
                return item.name;
            } else {
                var label = labelHelper.getLabel(item.schema, item);
                if (label && label.length > 20) {
                    label = label.substr(0, 20)+".."
                }
                return label;	// String
            }
        },

        // =======================================================================
        // Write interface, for DnD

        newItem: function (/* dijit/tree/dndSource.__Item */ args, /*Item*/ parent, /*int?*/ insertIndex, /*Item*/ before) {
            // summary:
            //		Creates a new item.   See `dojo/data/api/Write` for details on args.
            //		Used in drag & drop when item from external source dropped onto tree.

            return this.store.put(args, {
                parent: parent,
                before: before
            });
        },

        pasteItem: function (/*Item*/ childItem, /*Item*/ oldParentItem, /*Item*/ newParentItem,
                             /*Boolean*/ bCopy, /*int?*/ insertIndex, /*Item*/ before) {
            // summary:
            //		Move or copy an item from one parent item to another.
            //		Used in drag & drop

            if (typeof newParentItem.add === "function") {

                if (!bCopy) {
                    // In order for DnD moves to work correctly, childItem needs to be orphaned from oldParentItem
                    // before being adopted by newParentItem.   That way, the TreeNode is moved rather than
                    // an additional TreeNode being created, and the old TreeNode subsequently being deleted.
                    // The latter loses information such as selection and opened/closed children TreeNodes.
                    // Unfortunately simply calling this.store.put() will send notifications in a random order, based
                    // on when the TreeNodes in question originally appeared, and not based on the drag-from
                    // TreeNode vs. the drop-onto TreeNode.

                    oldParentItem.remove(childItem);
                    this.onChildrenChange(oldParentItem, this._getChildren(oldParentItem));
                }
                newParentItem.add(childItem, insertIndex);
                this.onChildrenChange(newParentItem, this._getChildren(newParentItem));


                return childItem;
            } else {
                return null;
            }
        },

        onChange: function (item) {
        },

        onChildrenChange: function (parent, newChildrenList) {
        },

        onDelete: function (item) {
        }
    });
});
