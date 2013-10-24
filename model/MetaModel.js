define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful"
], function(array, lang, declare, Stateful) {
	// module: 
	//		gform/Resolver

	return declare([Stateful], {
	// summary:
	//		Provides access to sibling attributes of modelHandle. 

		// schema:,
		//		the schema of this model
		schema:null	,

		// parent:,
		//		the parent model
		parent:null	,

		editorFactory: null,


		getPath: function(modelHandle) {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			return "";
		},
		getParent : function(attributeCode) {
			// summary:
			//		get value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			return this.parent.value.get(attributeCode).value;
		},
		watchParent: function( attributeCode, watchCallback) {
			// summary:
			//		watch value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			// watchCallback: function
			//		callback
			// returns: Object
			//		WatchHandle
			return this.parent.value[attributeCode].watch("value",watchCallback);
		},
		createMeta: function(schema) {
			// summary:
			//		create a meta object
			// returns: dojo/Stateful
			var meta= this.editorFactory.createMeta(schema);
			meta.set("tmp",new Stateful());
			meta.parent=this;
			return meta;	
		},
		resetMeta: function(/*dojo/Stateful*/meta) {
			// summary:
			//		rest meta object
			// meta: dojo/Stateful
			meta.set("tmp",new Stateful());
			meta.set("message",null);
			meta.set("state","");
			return meta;	
		},	})
});
