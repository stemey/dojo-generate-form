define([
	"dojo/_base/declare"
], function (declare) {
// module:
//		gform/controller/SingleSchemaRegistry


	return declare([], {
		// summary:
		//		A registry for stores. Makes it easy to reuse and mock stores.

		constructor: function (schema) {
			this.schema = schema;
		},
		schema: null,

		get: function (id, props) {
			return this.schema;
		},
		register: function (id, schema) {
		}
	});


});
