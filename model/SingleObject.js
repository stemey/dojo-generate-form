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
		attributes:null,
		isNull:true,
		update: function(/*Object*/plainValue, bubble) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			this._execute( function() {
				this.updateGroup(plainValue);
				this.set("oldValue",this.getPlainValue());
				this.computeProperties();
			});
			if (this.parent && bubble!==false) {
				this.parent.onChange();	
			}
		},
		getValue: function(attributeCode) {
			if (this.isNull) {
				return null;
			} else {
				return this.attributes[attributeCode].getPlainValue();
			}
		},
		setValue: function(attributeCode, value) {
			if (!this.isNull) {
				this.getModel(attributeCode).update(value);
			}
		},
		getModel: function(attributeCode) {
			return this.attributes[attributeCode];
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
				this.isNull=true;
			}else{
				this.isNull=false;
				for (var key in this.attributes) {
					this.attributes[key].update(plainValue[key], this.bubble);
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
			if (this.isNull) {
				return null;
			} else {
				var plainValue={};
				for (var key in this.attributes) {
					plainValue[key]=this.attributes[key].getPlainValue();
				};	
				return plainValue;
			}
		},
		iterateChildren: function( cb) {
			for (var key in this.getAttributeCodes()) {
				cb.call(this, this.getAttribute(this.getAttributeCodes()[key]));
			}
		},
		getPath: function(path) {
			if (this.isNull) {
				return null;
			}	
			if (typeof path.push != "function") {
				path = path.split(".");
			}
			if (path.length==0) {
				return this;
			}else if (path.length==1) {
				return this.getModel(path[0]);
			} else{
				var model = this.getModel(path[0]);
				return model.getPath(path.slice(2));
			}
		}
	})
});
