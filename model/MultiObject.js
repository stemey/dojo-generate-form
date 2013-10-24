define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful",//
"./MetaModel"
], function(array, lang, declare, Stateful, MetaModel) {
	// module: 
	//		gform/model/MultiObject

	return declare([MetaModel], {
	// summary:
	//		Provides access to sibling attributes of modelHandle. 

		typeProperty: null,
		groups:[],
		required:false,
		currentTypeCode:null,
		getGroup: function(typeCode) {
			var groups= array.filter(this.groups, function(group) {
				return group.getTypeCode()==typeCode;
			}, this);
			return groups.length==0 ? null : groups[0];	
		},
		update: function(/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			if (plainValue==null) {
				if (this.required) {
					this.currentTypeCode = this.groups[0].getValue(this.typeProperty);
					//this.value= getGroup(this.currentTypeCode);
				}else {
					this.currentTypeCode = null;
					//this.value=null;
				}
			} else {
				this.currentTypeCode = plainValue[this.typeProperty];
				//this.value= this.getGroup(this.currentTypCode);
			} 
			array.forEach(this.groups,function(group) {
				if (group.getTypeCode()==this.currentTypeCode)  {
					group.update(plainValue);
				}
			},this);
			this.set("oldValue",this.getPlainValue());
		},
		_currentTypeCodeSetter: function(typeCode) {
			var prevGroup = this.getGroup(this.currentTypeCode);
			this._changeAttrValue("currentTypeCode", typeCode);
			var value = this.getPlainValue();
			var nextGroup = this.getGroup(this.currentTypeCode);
			prevGroup.getAttributeCodes().forEach(
				function(attributeCode) {
					var nextAttribute =nextGroup.getAttribute(attributeCode);				
					if (nextAttribute) {
						value[attributeCode]=prevGroup.getValue(attributeCode);
					}	
				}
			)
			
			value[this.typeProperty] = typeCode;
			this.update(value);
		},	
		getPlainValue: function() {
			if (this.currentTypeCode==null) {
				return null;
			} else {
				var group = this.getGroup(this.currentTypeCode);
				return group.getPlainValue();
			}
		}
	})
});
