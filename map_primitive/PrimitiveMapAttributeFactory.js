define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"../schema/meta",//	
"dojo/_base/declare",//
"dojox/mvc/at",//
"../model/SingleObject",//
"dojo/Stateful",//
"../list_table/EmbeddedListWidget",//
"dojox/mvc/sync",//
"../layout/LayoutWidgetList",//
"../list_table/RepeatedEmbeddedWidget",//
"../model/updateModelHandle",//
"../model/getPlainValue",//
"../model/PrimitiveMapModel",//
"../layout/_LayoutMixin",
"../list_table/TableAttributeFactory",
], function(array, lang, aspect, Editor, metaHelper, declare, at, 
		SingleObject, Stateful,EmbeddedListWidget, sync, WidgetList,RepeatedEmbeddedWidget, updateModelHandle, getPlainValue, MapModel, _LayoutMixin, TableAttributeFactory) {

	return declare([TableAttributeFactory], {

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

			var tableMeta = this.createTableMeta(attribute);
			
			var widget = this.inherited(arguments, [tableMeta, modelHandle]);
			return widget;


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
			lang.mixin(value, schema.valueAttribute);
			value.code="value";
			attributes.push(value);
			return tableMeta
		},
		createModel: function(schema, value) {
			var me = this;
			var map = new MapModel({keyProperty:"key"});
			map.elementFactory= function(value) {
				var aModels = {};
				me.createTableMeta(schema).attributes.forEach(function(attribute) {
					aModels[attribute.code]=me.editorFactory.createAttributeModel(attribute);
				}, this);
				var model = SingleObject({attributes:aModels});
				model.update(value);
				return model;
			}
			return map;
		}
	})
});
