define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/store/Observable",
	"dojo/store/JsonRest",
], function(declare, lang, array, Observable, DefaultStore){
	
	return declare( [], {
			id2store:{},
			makeStoreObservable: true,
			StoreClass:DefaultStore,
			idProperty:"target",
			get: function(id, props) {
				var cached = this.id2store[id];
				if (!cached) {
					cached = new StoreClass(props);
					this.id2store[id] = cached;
				}
				return cached;
			}	,
			register: function(id, store) {
				if (!store.observe && this.makeStoreObservable) {
					store = new Observable(store);
				} 
				this.id2store[id] = store;
			}	
		});


});
