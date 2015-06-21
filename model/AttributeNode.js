define([
    "dojo/_base/declare"
], function (declare) {

    return declare("gform.model.AttributeNode",null, {
        constructor: function (attribute, model) {
            this.name = attribute.label || attribute.code;
            this.code = attribute.code;
            this.arrayModel = model.getModelByPath(this.code);

        },
        accept: function(model, position) {
            if (position!=="over") {
                return false;
            }
            if (model.schema) {
                return model.schema == this.arrayModel.schema  || model.schema == this.arrayModel.schema.group;
            } else {
                return false;
            }
        },
        isRemovable: function() {
          return false;
        },
        isAddable: function() {
            return true;
        },
        addNew: function() {
            this.arrayModel.addNew();
        },
        add: function (item, index) {
            if (item.getPlainValue)
            {
                this.arrayModel.push(item.getPlainValue(),index);
            }
        },
        remove: function (item) {
            if (item.getPlainValue) {
                this.arrayModel.remove(item);
            }
        },
        getChildNodes: function () {
            return this.arrayModel.value;
        },
        hasChildNodes: function() {
            return true;
        }
    });


});
