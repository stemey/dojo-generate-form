define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/store/JsonRest",
], function(declare, lang, array, DefaultStore){
	
	return declare( [], {
			id2store:{},
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
				this.id2store[id] = store;
			}	
		});


});
