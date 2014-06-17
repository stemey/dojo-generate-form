define([
    "dojo/i18n!../nls/messages",
    "dojo/_base/lang",
    "dojo/data/ItemFileReadStore"
], function (messages, lang, ItemFileReadStore) {


    function _parseUrl(url, model) {
        // this will parse the provided url and replace entities between curly brackets 
        // (i.e. {id}) with the values from the model
        // Example: http://example.com/api/users/{name}/age/{age}  ('age' and 'name' are attributes)
        var value = ( model && model.getPlainValue ) ? model.getPlainValue() : {};
        return lang.replace(url, value);
    }

    return function (attribute, modelHandle, select) {
        // Create a store
        // select: gform/Select optional
        var params = {};

        var model_value = modelHandle.get('value');
        /* clone value (model's value changes
         after the store is loaded) */
        var store = lang.clone(attribute.store);
        store.url = _parseUrl(store.url, modelHandle.parent);

        // If gform/Select is provided, and url has changed, reset the store
        if (select && select.store && select.store.url !== store.url) {
            select.setStore(new ItemFileReadStore(store));
        } else {
            // Otherwise, return the select params
            params = {
                store: new ItemFileReadStore(store),
                onSetStore: function () {
                    modelHandle.options = this.options;
                    /* copy the options (clone?!) */
                    modelHandle.update(model_value);
                    /* update with copied value */
                }
            };
        }

        return params;
    }
});


