define(
    [
        "dojo/_base/declare",
        "../../primitive/nullablePrimitiveConverter",
        "../../primitive/Select",
        "../../schema/meta",
        "dojox/mvc/sync",
        "./AttributeSelectModel",
        "../../primitive/PrimitiveAttributeFactory"
    ],
    function (declare, nullablePrimitiveConverter, Select, meta, sync, AttributeSelectModel, PrimitiveAttributeFactory) {

        return declare([PrimitiveAttributeFactory],
            {
                id: "attribute-ref",
                alwaysUseInvalidMessage: true,
                handles: function (attribute) {
                    return true;
                },
                create: function (attribute, modelHandle) {

                    var select = new Select({
                        maxHeight: -1
                    });

					sync(modelHandle, "value", select, "value", {converter: nullablePrimitiveConverter});
                    sync(modelHandle, "options", select, "options");
					if (modelHandle.options && modelHandle.options.length>0) {
						modelHandle.set("value", modelHandle.options[0].value);
					}

                    return select;

                },
                createModel: function (meta, plainValue) {
                    var validators = this.editorFactory.getModelValidators(meta);
                    var model = new AttributeSelectModel({meta: meta, validators: validators, required: meta.required === true});
                    //model.update(plainValue,true,false);
                    return model;
                }
            });
    });
