define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./MetaModel"
], function(array, lang, declare, MetaModel) {
	// module: 
	//		gform/model/PrimitiveModel

	return declare([MetaModel], {
	// summary:
	//		Provides access to sibling attributes of modelHandle. 
		update: function(/*Object*/plainValue, editorFactory) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			if (typeof plainValue=="undefined") {
				this.set("value",null);
			}else{
				this.set("value",plainValue);
			}
			this.set("oldValue",this.value);
		},
		getPlainValue: function() {
			return this.value;
		}

	})
});
