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
		nonNullValue:null, 
		attributes:null,
		constructor: function(kwArgs) {
				lang.mixin(this, kwArgs);
				this.nonNullValue=new Stateful();
				this.nonNullValue.value=new Stateful();
		},
		update: function(/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			var initialValue= plainValue || {};
			this.updateGroup(initialValue);
			if (plainValue==null) {
				this.set("value",null);
			}else{
				this.set("value",this.nonNullValue.value);
			}
			this.set("oldValue",this.getPlainValue(this.value));
		},
		getValue: function(attributeCode) {
			if (this.value==null) {
				return null;
			} else {
				return this.attributes[attributeCode].getPlainValue();
			}
		},
		updateGroup: function(/*Object*/plainValue) {
			// summary:
			//		update the group with the given plainValue
			// groupOrType:
			//		the schema of the group.
			// plainValue:
			//		the new value of the modelHandle
			// modelHandle:
			//		the modelHandle bound to the Editor.
			// editorFactory:
			//		editorFactory provides access to AttributeFactory and GroupFactory which may override the update behavior.
			if (plainValue==null) {
				this.set("value",null);
			}else{
				if (this.value==null ) {
					this.value = this.nonNullValue.value;
				}
				for (var key in this.attributes) {
					this.attributes[key].update(plainValue[key]);
				} 
			}
		},
		getTypeCode: function() {
			return this.typeCode;
		},
		getAttributeCodes: function() {
			var codes =[];
			for (var key in this.attributes) {
				codes.push(key);
			}
			return codes;	
		},
		getAttribute: function(code) {
			return this.attributes[code];
		},
		getPlainValue: function() {
			if (this.value==null) {
				return null;
			} else {
				var plainValue={};
				for (var key in this.attributes) {
					plainValue[key]=this.attributes[key].getPlainValue();
				};	
				return plainValue;
			}
		}
	})
});
