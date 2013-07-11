define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./controller/StoreRegistry"
], function(array, lang, declare, StoreRegistry) {
	// module: 
	//		gform/Resolver

	return declare([], {
		store: null,
		constructor: function() {
			this.storeRegistry=new StoreRegistry();
		},
		getStore: function(id, props) {
			return this.storeRegistry.get(id, props);
		}
	})
});
