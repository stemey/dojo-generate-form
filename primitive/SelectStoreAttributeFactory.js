define([
    "../model/PrimitiveModel",
    "dojo/aspect",
    "dojo/_base/declare",
    "dojox/mvc/at",
    "dojo/_base/lang",
    "./Select",
    "./createOptions",
    "./createStore",
    "./nullablePrimitiveConverter",
    "./dijitHelper",
    "./PrimitiveAttributeFactory",
    "dojo/data/ItemFileReadStore"

], function (SelectModel, aspect, declare, at, lang, Select, createOptions, createUpdateStore, nullablePrimitiveConverter, dijitHelper, PrimitiveAttributeFactory, ItemFileReadStore) {

    return declare([PrimitiveAttributeFactory], {
        id: "select-store",
        handles: function (attribute) {
            var store = attribute.store;
            return !attribute.array && !!store && store.url > '';
        },
        _parseUrl: function (url, model) {
            // this will parse the provided url and replace entities between curly brackets
            // (i.e. {id}) with the values from the model
            // Example: http://example.com/api/users/{name}/age/{age}  ('age' and 'name' are attributes)
            var value = ( model && model.getPlainValue ) ? model.getPlainValue() : {};
            return lang.replace(url, value);
        },
        createStore: function (attribute, modelHandle) {
            // Create a store
            // select: gform/Select optional
            var params = {};

            var model_value = modelHandle.get('value');
            /* clone value (model's value changes
             after the store is loaded) */
            var store = lang.clone(attribute.store);
            store.url = this._parseUrl(store.url, modelHandle.parent);

            params = {
                store: new ItemFileReadStore(store),
                onSetStore: function () {
                    var value = this.value;
                    var valid = this.options.some(function (option) {
                        return this.value === option.value;
                    }, this);
                    if (!valid) {
                        modelHandle.update(this.options[0].value);
                    }
                    /* update with copied value */
                }
            };

            return params;
        },
        updateStore: function (attribute, modelHandle, select) {

            var model_value = modelHandle.get('value');
            /* clone value (model's value changes
             after the store is loaded) */
            var store = lang.clone(attribute.store);
            store.url = this._parseUrl(store.url, modelHandle.parent);
            if (select.store.url !== store.url) {
                select.setStore(new ItemFileReadStore(store));
            }

        },
        create: function (attribute, modelHandle) {

            var valueBinding = at(modelHandle, "value").transform(
                nullablePrimitiveConverter);

            var props = {
                "value": valueBinding,
                maxHeight: -1
            };

            lang.mixin(props, this.createStore(attribute, modelHandle));

            var select = new Select(props);

            // Update the store if the url has changed!
            var me = this;
            if (modelHandle.parent) {
                aspect.after(modelHandle.parent, "onChange", function () {
                    me.updateStore(attribute, modelHandle, select);
                });
            }

            return select;

        },
        createModel: function (meta, plainValue) {
            var validators = this.editorFactory.getModelValidators(meta);
            var options = createOptions(meta, true);
            var model = new SelectModel({meta: meta, options: options, validators: validators, required: meta.required === true});
            model.update(plainValue);
            return model;
        }
    });

})
;
