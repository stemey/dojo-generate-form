define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"../layout/LayoutWidgetList",//
"../list_embedded/RepeatedEmbeddedWidget",//
"../model/updateModelHandle",//
"../model/getPlainValue",//
"dojox/mvc/StatefulArray",//
"../layout/_LayoutMixin"
], function(array, lang, aspect, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle, getPlainValue, StatefulArray, _LayoutMixin) {

	return declare([], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && ((attribute.type && 	attribute.type.attributes) || attribute.validTypes) && attribute.map
		},
		create : function(attribute, modelHandle) {


			if (modelHandle.value==null) {
				throw "set default value";
			}	

			var childMeta = this._createChildMeta(attribute, "__key");
			var elementMeta = this._createChildMeta(attribute, "__key");
			elementMeta.array=false;

			var select = new EmbeddedListWidget({
				target : modelHandle,
				attribute : elementMeta,
				editorFactory : this.editorFactory
			});


			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				meta : childMeta,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);



			return select;

		},
		_createChildMeta: function(attribute, keyAttributeCode) {
	 		var attributeMeta = {};
			lang.mixin(attributeMeta, attribute);
			attributeMeta.array=true;
			attributeMeta.map=false;
			var keyAttribute = {type: "string", code: keyAttributeCode, required: true, label: attribute.keyLabel || "key", description: attribute.keyDescription || null};
			var xTypes= array.map(attribute.validTypes, function(type) {
				if (!type.attributes) {
					throw new Error("cannot handle group of groups");
				}
				var xtype = {};
				lang.mixin(xtype, type);
				var xattributes = array.map(type.attributes, function(attribute) {
					return attribute;
				});
				xtype.attributes= xattributes;
				xtype.attributes.splice(0,0,keyAttribute);
				return xtype; 
			});			
			attributeMeta.uniqueProperties = attributeMeta.uniqueProperties || [];
			attributeMeta.uniqueProperties.push(keyAttribute.code);
			attributeMeta.validTypes= xTypes;
			return	attributeMeta;		
		},
		updateModelHandle: function(/*Object*/attribute, /*Object*/plainValue, /*dojo/Stateful*/modelHandle) {
			var keyAttributeCode = "__key";
			var attributeMeta=this._createChildMeta(attribute, keyAttributeCode);
			attributeMeta.array=true;
			
			var plainArray=[];
			for (var key in plainValue) {
				var entry={};
				entry[keyAttributeCode]=key;
				lang.mixin(entry,plainValue[key]);
				plainArray.push(entry);
			}

			updateModelHandle.cascadeAttribute(attributeMeta, plainArray, modelHandle, this.editorFactory);

			modelHandle.value.__key=keyAttributeCode;
			modelHandle.value.__type="map";
			modelHandle.oldValue=getPlainValue(modelHandle);	


		},
	})
});
