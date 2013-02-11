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
		updateObjectType: function(type_property,type, plainValue, modelHandle,editorFactory) {
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
					this.cascadeAttribute(attribute,plainValue[attribute.code], childHandle,editorFactory);
				},this);
			}
		},
		setNull: function(meta,modelHandle) {
			if (modelHandle.value==null) {
				return;
			}
			modelHandle.nonNullValue.set("value",modelHandle.value);
			modelHandle.set("value",null);
		},
		setEmpty: function(modelHandle) {
			if (!modelHandle.nonNullValue) {
				modelHandle.nonNullValue=this.createMeta();
				modelHandle.nonNullValue.value=new Stateful({});
			}
			modelHandle.set("value",modelHandle.nonNullValue.value);
		}, 
		updateObject: function( meta, plainValue, modelHandle,editorFactory) {
			if (plainValue==null) {
				this.setNull(meta,modelHandle);
			}else{
				if (modelHandle.value==null){
					this.setEmpty(modelHandle);
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
				this.updateObjectType(meta.type_property,type,plainValue,modelHandle,editorFactory);
			}
		},
		updatePolyObject: function( meta, plainValue, modelHandle,editorFactory) {
			var typeToValue=modelHandle.typeToValue;
			if (!typeToValue) {
				modelHandle.typeToValue={};
				array.forEach(meta.validTypes,function(type) {
					var metaObject= this.createMeta();
					metaObject.value=new Stateful({});
					metaObject.value[meta.type_property]=this.createMeta();
					metaObject.value[meta.type_property].value=type.code;
					modelHandle.typeToValue[type.code]=metaObject;
				},this);
				typeToValue=modelHandle.typeToValue;
			}
			if (plainValue==null) {
				modelHandle.set("value",null);
			}else{
				if (meta.validTypes.length>1 && !meta.type_property) {
					throw new Error("more than one type defined but no type property");
				}
				var typeCode=plainValue[meta.type_property];
				var type=this.getFromValidTypes(meta.validTypes,typeCode);
				if (type==null) {
					throw new Error("type "+typeCode+" is invalid");
				}
				var value = typeToValue[typeCode].value;
				modelHandle.set("value",value);
				this.updateObjectType(meta.type_property,type,plainValue,modelHandle,editorFactory);
			}
		},
		updateString: function(meta,plainValue, modelHandle,editorFactory) {
			if (plainValue==null) {
				modelHandle.set("value","");
			}else{
				modelHandle.set("value",plainValue);
			}
		},
		updateBoolean: function(meta,plainValue, modelHandle,editorFactory) {
			if (plainValue==null) {
				modelHandle.set("value",false);
			}else{
				modelHandle.set("value",plainValue);
			}
		},
		updateNumber: function(meta,plainValue, modelHandle,editorFactory) {
			if (plainValue==null) {
				modelHandle.set("value",0);
			}else{
				modelHandle.set("value",plainValue);
			}
		},
		updateArray: function(meta,plainValue, modelHandle,editorFactory) {
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
					}
					this.cascadeAttribute(childMeta,element,model,editorFactory);
					modelArray.push(model);
				},this);
			}
		},
		createMeta: function() {
			return new Stateful({__type:"meta"});
		},
		cascadeAttribute: function(meta,plainValue,modelHandle,editorFactory) {
			if (editorFactory) {
				var handle=editorFactory.getUpdateModelHandle(meta);
				if (handle.updateModelHandle) {
					return handle.updateModelHandle(meta,plainValue,modelHandle);
				}
			}
			if (meta.array ) {
				this.updateArray(meta,plainValue,modelHandle);
			}else if (meta.validTypes && meta.validTypes.length==1) {
				this.updateObject(meta,plainValue,modelHandle);
			}else if (meta.validTypes && meta.validTypes.length>1) {
				this.updatePolyObject(meta,plainValue,modelHandle);
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
