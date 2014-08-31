define([
    "dojo/_base/declare",
    "dojo/store/JsonRest"
], function (declare, DefaultStore) {
// module:
//		gform/controller/StoreRegistry


    return declare([], {
        // summary:
        //		A registry for stores. Makes it easy to reuse and mock stores.

        // id2store: object
        //		id (probably url) to store mapping
        id2store: {},

        // StoreClass:
        //		the class used for initializing stores.
        StoreClass: DefaultStore,
        get: function (id, props) {
            // summary:
            //		get the store for the id. If none exist then instantiate the default store with the given properties
            // id: String
            //		the id (e.g. url) of the store
            // props: object
            //		the properties of the store (e.g.: target/url and idProperty)
            var cached = this.id2store[id];
            if (!cached) {
                cached = new this.StoreClass(props);
                this.id2store[id] = cached;
            }
            return cached;
        },
        register: function (id, store) {
            // summary:
            //		register a store with the id
            // id: String
            //		the id
            // store: dojo/store/Store
            //		a store instance
            this.id2store[id] = store;
        }
    });


});
