define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./controller/StoreRegistry",
"./controller/SchemaRegistry",
], function(array, lang, declare, StoreRegistry, SchemaRegistry) {
	// module: 
	//		gform/Context

	return declare([], {
		// summary:
		//		the Context is available to all GroupFactories and AttributeFactories during creation of an editor.
		//		It's purpose is to share editor instance specifc information. 

		// opener: gform/opener/Opener
		//		opens an editor for creation or editing
		opener: null,

		// storeRegistry:
		//		A registry for stores
		storeRegistry: null,

		// schemaRegistry:
		//		A registry for schemas
		schemaRegistry: null,
		constructor: function() {
			this.storeRegistry=new StoreRegistry();
			this.schemaRegistry=new SchemaRegistry();
		},
		// summary:
		//		get a shared store
		// id: String
		//		the id of the store. Usually its url.
		// props: Object
		//		the properites of the store (e.g.: idProperty and url)
		getStore: function(id, props) {
			return this.storeRegistry.get(id, props);
		},
		getUrl: function(id) {
			return getStore(id).target;
		},
		getSchema: function(url) {
			return this.schemaRegistry.get(url);
		}
	})
});
