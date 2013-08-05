define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/store/Observable",
	"dojo/store/JsonRest",
], function(declare, lang, array, Observable, DefaultStore){
// module:
//		gform/controller/StoreRegistry

		
	return declare( [], {
		// summary:
		//		A registry for stores. Makes it easy to reuse and mock stores.

			constructor: function(store) {
				this.store=store;
			},
			store:null,

			get: function(id, props) {
				return this.store;
			}	,
			register: function(id, store) {
			}	
		});


});
