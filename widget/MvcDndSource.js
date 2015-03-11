define([
    "dojo/_base/declare",
    "dojo/dnd/Source",
    "dijit/registry"
], function (declare, DndSource, registry) {

    return declare([DndSource], {
        copyFn: null,
        widgetList: null,
        constructor: function () {
            this.widgetList = registry.byNode(this.node);
            var me = this;
            this.widgetList.children.watchElements(function () {
                me.sync();
            });

        },
        onDropExternal: function (nodes, copy) {
            this._onDrop(nodes, copy);
        },
        onDropInternal: function (nodes, copy) {
            this._onDrop(nodes, copy);
        },
        _onDrop: function (nodes, copy) {
            var model = this.widgetList.children;
            var childWidgets = this.widgetList.getChildren();
            var anchorWidget = registry.byNode(this.targetAnchor);
            var anchorPos = childWidgets.indexOf(anchorWidget);
            var dragged = null;
            for (var key in this.selection) {
                dragged = key;
                break;
            }
            var currentWidget = registry.byId(dragged);
            var sourceWidgetList = currentWidget.get("parent");
            var currentPos = sourceWidgetList.getChildren().indexOf(currentWidget);
            this._removeSelection();
            var sourceModel = sourceWidgetList.children[currentPos];
            if (!copy) {
                sourceWidgetList.children.splice(currentPos, 1)[0];
            }
            if (anchorPos > currentPos) {
                anchorPos--;
            }
            var copied = this.copyFn(sourceModel, copy);
            model.splice(anchorPos, 0, copied);
            // initialize model after adding it to parent
            copied.init();
            var value = sourceModel.getPlainValue();
            if (value) {
                copied.update(value, false, true);
            }
			// notify again after updated moved element
			if(model._watchCallbacks){
				//model._watchCallbacks();
			}

        }

    });

});
