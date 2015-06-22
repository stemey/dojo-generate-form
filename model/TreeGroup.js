define([
    '../schema/labelHelper',
    './AttributeNode',
    './MultiGroup',
    "dojo/_base/declare"
], function (labelHelper, AttributeNode, MultiGroup, declare) {


    return declare("gform.model.TreeGroup", [MultiGroup], {

        removable: true,
        editorFactory: null,
        detailGroup: null,
        childNodes: null,
        init: function () {
            // TODO move to factory
            var nodeAttributes = this.schema.nodeAttributes;
            this.childNodes = nodeAttributes.map(function (a) {
                return new AttributeNode(a, this);
            }, this);
            this.inherited(arguments);
        },
        _isSingleAttribute: function () {
            return this.childNodes.length == 1;
        },
        _getSingleAttribute: function () {
            return this.childNodes[0];
        },
        hasChildNodes: function () {
            return true;
        },
        getChildNodes: function (item) {
            if (this._isSingleAttribute()) {
                return this._getSingleAttribute().getChildNodes();
            } else {
                return this.childNodes;
            }
        },
        getLabel: function () {
            var label = labelHelper.getLabel(this.schema, this);
            if (label && label.length > 20) {
                label = label.substr(0, 20)+"..";
            }
            label += this.editorFactory.createBadge(this);
            return label;

        },
        accept: function (model, position) {
            if (position=="over" && this._isSingleAttribute()) {
                return this._getSingleAttribute().accept(model, position);
            } else {
                if (position == "over") {
                    return false;
                }
                if (model.schema) {
                    return model.schema == this.schema;
                } else {
                    return false;
                }
            }
        },
        isRemovable: function () {
            return this.removable;
        },
        removeSelf: function () {
            this.parent.remove(this);
        },
        isAddable: function () {
            return this._isSingleAttribute;
        },
        getDetailModel: function () {
            return this.detailGroup;
        },
        getRoot: function () {
            return this;
        },
        addNew: function () {
            return this._getSingleAttribute().addNew();
        },
        add: function (item, index) {
            return this._getSingleAttribute().add(item, index);
        },
        remove: function (item) {
            return this._getSingleAttribute().remove(item);
        }


    });
});
