define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/dom-class",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"./_MappedSelectAttributeFactoryBase",//
"../getStateful",//
"./bindArray",//
"../getPlainValue",//
"dojox/mvc/StatefulArray"
], function(array, lang, declare, domClass, at, CheckedMultiSelect, _MappedSelectAttributeFactoryBase, //
		getStateful, meta, bindArray, StatefulArray) {

	return declare("gform.MappedCheckedMultiSelectAttributeFactory", [ _MappedSelectAttributeFactoryBase ], {

		handles : function(attribute) {
			return attribute != null && attribute.array && !attribute.validTypes && attribute.mapped_values;
		},
			create : function(attribute, modelHandle, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			

			var select = new CheckedMultiSelect({
				"value" : valueBinding,
				options : options,
				style : "width: 200px;",
				multiple:true
			});

			bindArray(modelHandle,select,"value");
			this._watchMappedAttribute(attribute,select,resolver);
			
			if (options.length == 0) {
				this._hideAndDisable(select);
			}
			
			return select;
		},
		

	});
});
