define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful",//
"./MetaModel"
], function(array, lang, declare, Stateful, MetaModel) {
	// module: 
	//		gform/model/SingleObject

	return declare([MetaModel], {
	// summary:
	//		Provides access to sibling attributes of modelHandle.
		groups:null,
		isNull:true,
		constructor: function(kwArgs) {
				lang.mixin(this, kwArgs);
		},
		update: function(/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			if (plainValue==null) {
				this.isNull = true;
			} else {
				this.isNull = false;
				this.groups.forEach(function(group) {
					group.update(plainValue);
				});
			}
		},
		getModelByIndex: function(index) {
			return this.groups[index];
		},
		getModel: function(attributeCode) {
			var model = null;
			this.groups.map(function(group) {	
				var m = group.getModel(attributeCode);
				if (m!=null) {
					model = m;
				}
			});
			return model;
		},
		getPlainValue: function() {
			if (this.isNull) {
				return null;
			} else {
				var plainValue = {};
				this.groups.forEach(function(group) {
					var value = group.getPlainValue();
					lang.mixin(plainValue, value);
				});
				return plainValue;
			}
		},
		getPath: function(path) {
			throw new Error("not implemented yet");
		}
	})
});
