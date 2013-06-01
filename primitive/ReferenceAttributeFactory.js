define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojo/when",//
		"dojox/mvc/at",//
		"./FilteringSelect",//
		"../schema/meta",//
		"./dijitHelper",
		"dojo/store/Memory",
		"dojo/store/JsonRest",
		"./refConverter",
		"./makeConverterDijitAware"
		],
		function(array, lang, declare, when, at, FilteringSelect, meta, dijitHelper, Memory, Store, refConverter, makeConverterDijitAware) {

	return declare(
			"gform.ReferenceAttributeFactory",
			[],
			{
			handles : function(attribute) {
				return meta.isType(attribute,"ref")
						&& !attribute.array;
			},
			create : function(attribute, modelHandle) {
				var idProperty = attribute.idProperty || "id";
				var searchProperty = attribute.searchProperty || "name";
				var props = {};
				dijitHelper.copyDijitProperties(attribute, props);
				var dijitAwareConverter = makeConverterDijitAware(refConverter);
				props["value"]=at(modelHandle, "value").transform(dijitAwareConverter);
				props["message"]=at(modelHandle, "message");
				props["state"]=at(modelHandle, "state");
				if (attribute.url) {	
					var store = new Store({
						targetUrl: attribute.url,
						idProperty: idProperty
					});
				} else if (attribute.values) {
					var store = new Memory({
						data: attribute.values, 
						idProperty: idProperty
					});
				} else {
					throw new Error("neither url nor values in attribute of type ref "+attribute.code);
				}
				props["store"]= store;
				props["searchAttr"]= searchProperty;

				dijitHelper.copyDijitProperties(attribute,props);
				var f = new FilteringSelect(props);
				dijitAwareConverter.dijit=f;
				

				var currentId = modelHandle.get("value");
				if (currentId) {
					// value is the id
					var promise = store.get(modelHandle.get("value"));
					when(promise).then(function(result) {
						if (result) {
							f.set("name", result[searchProperty]);
						}
					});
				}
							
				return f;
			}
	})
});
