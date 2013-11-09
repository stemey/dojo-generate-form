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
"dojox/mvc/StatefulArray",//
"../layout/_LayoutMixin"
], function(array, lang, aspect, Editor, metaHelper, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle, getPlainValue, StatefulArray, _LayoutMixin) {

	return declare([], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute.type=="primitive-map";
		},
		create : function(attribute, modelHandle) {

			if (modelHandle.value==null) {
				throw "set default value";
			}	

			var childMeta = this.createTableMeta(attribute);
			
			var factory = this.editorFactory.getAttributeFactory(childMeta);
			return factory.create(childMeta, modelHandle);


		},
		createTableMeta: function(schema) {
			var tableMeta = {type:"table-single-array", reorderable:false, attributes:[]};
			var attributes=tableMeta.attributes;	
			var key = {};
			lang.mixin(key, schema.keyAttribute);
			key.type="string";
			key.code="key";
			key.required=true;
			attributes.push(key);
			var value = {};
			lang.mixin(key, schema.valueAttribute);
			value.code="code";
			attributes.push(value);
			return tableMeta
		},
		createModel: function(schema, value) {
			
			var map = new MapModel({keyProperty:"key"});
			map.elementFactory= function(value) {
				var model = SingleObject({attributes:createTableMeta(schema).attributes});
				model.update(value);
				return model;
			}
			return map;
		}
	})
});
