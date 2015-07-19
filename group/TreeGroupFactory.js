define([
    '../model/MultiTreeGroup',
    '../schema/meta',
    './tree/TreeContainer',
    '../model/TreeGroup',
    "dojo/_base/lang",
    "dojo/_base/declare"

], function (MultiTreeGroup, metaHelper, TreeContainer, TreeGroup, lang, declare) {

    return declare([], {
        id: "tree",
        constructor: function (kwArgs) {
            lang.mixin(this, kwArgs);
        },
        createModel: function (meta) {
            var validators = this.editorFactory.getModelValidators(meta);


            if (metaHelper.isMultiObject(meta)) {
                var model = new MultiTreeGroup({
                    editorFactory: this.editorFactory,
                    typeCodeToGroup: {},
                    schema: meta,
                    typeProperty: meta.typeProperty,
                    required: true,
                    editorFactory: this.editorFactory
                });
            } else {

                var detailGroup = this.editorFactory.createGroupModel(meta.detailGroup);
                var nodeGroup = this.editorFactory.createGroupModel({attributes:meta.nodeAttributes});


                // the order of groups is important for usage in a form, where the detail's attribute references depend on the attributes nodes
                var model = new TreeGroup({
                    editorFactory: this.editorFactory,
                    validators: validators,
                    schema: meta,
                    groups: [nodeGroup, detailGroup],
                    detailGroup: detailGroup,
                    required: meta.required === true
                });
            }

            return model;
        },
        create: function (group, modelHandle, ctx) {

            var container = new TreeContainer({
                ctx: ctx,
                model: modelHandle,
                editorFactory: this.editorFactory
            });

            return container;
        }

    });
});
