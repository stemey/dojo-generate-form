define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"../schema/meta",//	
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"../list_table/EmbeddedListWidget",//
"dojox/mvc/sync",//
"../layout/LayoutWidgetList",//
"../list_table/RepeatedEmbeddedWidget",//
"../model/updateModelHandle",//
"../model/getPlainValue",//
"../model/validate",//
"dojox/mvc/StatefulArray",//
"../layout/_LayoutMixin"
], function(array, lang, aspect, Editor, metaHelper, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle, getPlainValue, validate, StatefulArray, _LayoutMixin) {

	return declare([], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return metaHelper.isMap(attribute) && metaHelper.isPrimitive(attribute);
		},
		create : function(attribute, modelHandle) {

			if (modelHandle.value==null) {
				throw "set default value";
			}	

			var childMeta = this._createChildMeta(attribute, "__key");
			var elementMeta = this._createChildMeta(attribute, "__key");
			elementMeta.array=false;

			var factory = this.editorFactory.getAttributeFactory(childMeta);
			return factory.create(childMeta, modelHandle);


		},
		_createChildMeta: function(attribute, keyAttributeCode) {
	 		var attributeMeta = {};
			lang.mixin(attributeMeta, attribute);
			attributeMeta.array=true;
			attributeMeta.map=false;
			attributeMeta.editor="table";
			attributeMeta.reorderable=false;
			var attributes=[];
			attributeMeta.validTypes=[
				{
					attributes:attributes
				}
			]
			var keyAttribute = {type: "string", code: keyAttributeCode, required: true, label: attribute.keyLabel || "key", description: attribute.keyDescription || null};

			var valueAttribute=	{code: "value",
					label: "value",
					type: attribute.type,
					required: attribute.required}


			attributes.push(keyAttribute);
			attributes.push(valueAttribute);
			
			
			
			attributeMeta.uniqueProperties = attributeMeta.uniqueProperties || [];
			attributeMeta.uniqueProperties.push(keyAttribute.code);
			return	attributeMeta;		
		},
		updateModelHandle: function(/*Object*/attribute, /*Object*/plainValue, /*dojo/Stateful*/modelHandle) {
			var keyAttributeCode = "__key";
			var attributeMeta=this._createChildMeta(attribute, keyAttributeCode);
			
			var plainArray=[];
			for (var key in plainValue) {
				var entry={};
				entry[keyAttributeCode]=key;
				entry["value"]=plainValue[key];
				plainArray.push(entry);
			}

			var factory = this.editorFactory.getAttributeFactory(attributeMeta);
			factory.updateModelHandle(attributeMeta, plainArray, modelHandle);

			modelHandle.value.__key=keyAttributeCode;
			modelHandle.value.__type="primitiveMap";
			modelHandle.oldValue=getPlainValue(modelHandle);	


		},
	})
});
