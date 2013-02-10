define([
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/Stateful",
	"dojox/mvc/StatefulArray",
	"./getStateful"
], function(array, lang, Stateful, StatefulArray, getStateful){


  var updateModelHandle= {
		getFromValidTypes: function(validTypes,typeCode) {
			if (validTypes.length==1) {
				return validTypes[0];
			}
			var types=array.filter(validTypes,function(type) {
				if (type.code==typeCode) {
					return type;
				}
			});
			return types.length > 0 ? types[0] : null;
		},
		updateObjectType: function(type_property,type, plainValue, modelHandle) {
			if (plainValue==null) {
				if (modelHandle.value) {
					modelHandle.nonNullValue=modelHandle.value;
				}
				modelHandle.set("value",null);
			}else{
				if (modelHandle.value==null && ! modelHandle.nonNullValue) {
					modelHandle.set("value",new Stateful({}));
				}else if (modelHandle.value==null && modelHandle.nonNullValue) {
					modelHandle.set("value",modelHandle.nonNullValue);
				}
				array.forEach(type.attributes,function(attribute) {
					var childHandle = modelHandle.value[attribute.code];
					if (!childHandle) {
						childHandle=this.createMeta();
						modelHandle.value[attribute.code]=childHandle;
					}
					this.cascadeAttribute(attribute,plainValue[attribute.code], childHandle);
				},this);
			}
		},
		setNull: function(meta,modelHandle) {
			if (modelHandle.value==null) {
				return;
			}
			modelHandle.nonNullValue=modelHandle.value;
			modelHandle.set("value",null);
		},
		setEmpty: function(meta,modelHandle) {
			if (!modelHandle.nonNullValue) {
				updateModelHandle(meta,{},modelHandle.nonNullValue);
			}
			modelHandle.set("value",modelHandle.nonNullValue);
		}, 
		updateObject: function( meta, plainValue, modelHandle) {
			if (plainValue==null) {
				if (modelHandle.value) {
					modelHandle.nonNullValue=modelHandle.value;
				}
				modelHandle.set("value",null);
			}else{
				if (modelHandle.value==null && ! modelHandle.nonNullValue) {
					modelHandle.set("value",new Stateful({}));
				}else if (modelHandle.value==null && modelHandle.nonNullValue) {
					modelHandle.set("value",modelHandle.nonNullValue);
				}
				if (meta.validTypes.length>1 && !meta.type_property) {
					throw new Error("more than one type defined but no type property");
				}
				var typeCode=plainValue[meta.type_property];
				if (!typeCode) {
					var type=meta.validTypes[0];
				}else{
					var type=this.getFromValidTypes(meta.validTypes,typeCode);
					if (type==null) {
						throw new Error("type "+typeCode+" is invalid");
					}
					modelHandle.value.set(meta.type_property,new Stateful({__type:"meta",value:type.code}));
				}
				this.updateObjectType(meta.type_property,type,plainValue,modelHandle);
			}
		},
		updateString: function(meta,plainValue, modelHandle) {
			if (plainValue==null) {
				modelHandle.set("value","");
			}else{
				modelHandle.set("value",plainValue);
			}
		},
		updateBoolean: function(meta,plainValue, modelHandle) {
			if (plainValue==null) {
				modelHandle.set("value",false);
			}else{
				modelHandle.set("value",plainValue);
			}
		},
		updateNumber: function(meta,plainValue, modelHandle) {
			if (plainValue==null) {
				modelHandle.set("value",0);
			}else{
				modelHandle.set("value",plainValue);
			}
		},
		updateArray: function(meta,plainValue, modelHandle) {
			if (modelHandle.value==null) {
				modelHandle.set("value",new StatefulArray([]));
			}
			if (plainValue==null) {
				modelHandle.value.splice(0,modelHandle.value.length);
			}else{
				var modelArray=modelHandle.value;
				var childMeta={};
				lang.mixin(childMeta,meta);
				childMeta.array=false;
				array.forEach(plainValue,function(element,i) {
					var model=modelArray[i];
					if (model==null) {
						model = this.createMeta();
						modelArray.push(model);
					}
					this.cascadeAttribute(childMeta,element,model);
				},this);
			}
		},
		createMeta: function() {
			return new Stateful({__type:"meta"});
		},
		cascadeAttribute: function(meta,plainValue,modelHandle) {
			if (meta.array ) {
				this.updateArray(meta,plainValue,modelHandle);
			}else if (meta.validTypes) {
				this.updateObject(meta,plainValue,modelHandle);
			}else if (meta.type=="string") {
				this.updateString(meta,plainValue,modelHandle);
			}else if (meta.type=="number") {
				this.updateNumber(meta,plainValue,modelHandle);
			}else if (meta.type=="boolean") {
				this.updateBoolean(meta,plainValue,modelHandle);
			}
		}
	}
	

	return updateModelHandle;
});
