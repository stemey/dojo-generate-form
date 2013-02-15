define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/form/CheckedMultiSelect",//
"./_SelectAttributeFactoryBase",//
"../getStateful",//
"../meta"//
], function(array, lang, declare, at, CheckedMultiSelect, _SelectAttributeFactoryBase, getStateful, meta) {

	return declare("gform.CheckedSelectAttributeFactory", [ _SelectAttributeFactoryBase ], {

		handles : function(attribute) {
			var values = meta.getTypeAttribute(attribute,"values");	
			return !attribute.array && values != null && values.length > 0;
		},
 		
 		createValueBinding : function(modelHandle) {
 			var valueConverter = this.createValueConverter();
			return at(modelHandle, "value").transform(valueConverter);
		},
 		
 		createSelect : function(config) {
 			config["multiple"] = false;
 			return new CheckedMultiSelect(config);
 		}
		
	});
});