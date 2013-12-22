define([
	"dojo/_base/declare"
], function (declare) {
// module:
//		gform/controller/StoreRegistry


	return declare([], {
		// summary:
		//		A registry for stores. Makes it easy to reuse and mock stores.

		constructor: function (store) {
			this.store = store;
		},
		store: null,

		get: function (id, props) {
			return this.store;
		},
		register: function (id, store) {
		}
	});


});
