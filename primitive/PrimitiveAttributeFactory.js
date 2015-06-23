define([
    'dojo/aspect',
    "dojo/_base/lang",
    "dojo/_base/declare",
    "../model/PrimitiveModel"
], function (aspect, lang, declare, PrimitiveModel) {

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
            var dijitValidator = function (model, force) {
                var r = widget.validate(true);
                if (widget.state === "Error") {
                    return [
                        {path: "", message: widget.message}
                    ];
                }
                return [];

            }
            model.validators.push(dijitValidator);
            aspect.after(widget, "destroy", function () {
                var index = model.validators.indexOf(dijitValidator);
                if (index >= 0) {
                    model.validators.splice(index, 1);
                }
            })

        },
        createModel: function (meta) {
            var validators = this.editorFactory.getModelValidators(meta);
            var model = new PrimitiveModel({
                schema: meta,
                alwaysUseInvalidMessage: this.alwaysUseInvalidMessage === true,
                validators: validators,
                required: meta.required === true
            });
            return model;
        }
    });


});
