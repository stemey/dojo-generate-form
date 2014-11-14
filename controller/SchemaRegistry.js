define([
	"dojo/_base/declare",
	"dojo/request",
	"dojo/_base/Deferred"
], function (declare, request, Deferred) {
// module:
//		gform/controller/SchemaRegistry


	return declare([], {
		// summary:
		//		A registry for stores. Makes it easy to reuse and mock stores.

		// id2store: object
		//		id (probably url) to store mapping
		url2schema: {},
		onlyStatic: false,

		get: function (url) {
			// summary:
			//		get the store for the id. If none exist then instantiate the default store with the given properties
			// url: String
			//		the url of the schema
			// return: object | dojo/Promise
			var cached = this.url2schema[url];
			if (cached) {
				return cached;
			} else {
				if (this.onlyStatic) {
					var d = new Deferred();
					d.reject(new Error("does not exist"));
					return d;
				} else {
					return request.get(url, {handleAs: "json"});
				}
			}
		},
		register: function (url, schema) {
			// summary:
			//		register a store with the id
			// url: String
			//		the url
			// schema: Object
			//		the schema instance
			this.url2schema[url] = schema;
		}
	});


});
