define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/Select",//
"./_MappedSelectAttributeFactoryBase",//
"../meta"
], function(array, lang, declare, at, Select, _MappedSelectAttributeFactoryBase, meta) {

	return declare("app.SelectAttributeFactory", [ _MappedSelectAttributeFactoryBase ], {
		
		handles: function(attribute) {
			var mapped_values=attribute.mapped_values;
			return !attribute.array && mapped_values;
		},

		createValueBinding : function(modelHandle) {
			return at(modelHandle, "value");
		},

		createSelect : function(config) {
			return new Select(config);
		}
		
	});
});
