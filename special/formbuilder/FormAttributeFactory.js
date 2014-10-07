define(
    [
        "dojo/_base/declare",
        "./GroupTransformer",
        "../../embedded/EmbeddedAttributeFactory"
    ],
    function (declare, GroupTransformer, EmbeddedAttributeFactory) {

        return declare([EmbeddedAttributeFactory],
            {
                id: "form",
                alwaysUseInvalidMessage: true,
                createModel: function (schema, plainValue) {
                    if (plainValue === null && schema.required) {
                        plainValue = {};
                    }
                    var validators = this.editorFactory.getModelValidators(schema);
                    var model = this.editorFactory.createGroupModel(schema.group, plainValue);
                    // marker to find the parent form
                    model.form = true;
                    model.transformer = new GroupTransformer();
                    model.validators = validators;
                    model.required = schema.required === true;
                    if ("visitThis" in model) {
                        model.visitThis = true;
                    }
                    return model;
                }
            });
    });