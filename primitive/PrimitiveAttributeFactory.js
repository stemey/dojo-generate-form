define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "../model/PrimitiveModel"
], function (lang, declare, PrimitiveModel) {

    return declare([], {
        editorFactory: null,
        // alwaysUseInvalidMessage:
        //		always use invalid message instead of validation specific, because dijit does the same.
        //		TODO: improve in that only dijit validations are taken into concern here.
        alwaysUseInvalidMessage: false,
        constructor: function (kwArgs) {
            lang.mixin(this, kwArgs);
        },
        addDijitValidation: function (model, widget) {
            model.validators.push(function (model, force) {
                var r = widget.validate(true);
                if (widget.state === "Error") {
                    return [
                        {path: "", message: widget.message}
                    ];
                } else {
                    return [];
                }
            });

        },
        createModel: function (meta, plainValue) {
            var validators = this.editorFactory.getModelValidators(meta);
            var model = new PrimitiveModel({schema: meta, alwaysUseInvalidMessage: this.alwaysUseInvalidMessage === true, validators: validators, required: meta.required === true
            });
            model.update(plainValue);
            return model;
        }
    });

});
