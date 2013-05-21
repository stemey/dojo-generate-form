define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojo/when",//
		"dojox/mvc/at",//
		"./FilteringSelect",//
		"../meta",//
		"./dijitHelper",
		"dojo/store/Memory",
		"dojo/store/JsonRest",
		"./nullablePrimitiveConverter"
		],
		function(array, lang, declare, when, at, FilteringSelect, meta, dijitHelper, Memory, Store, nullablePrimitiveConverter) {

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
				props["value"]=at(modelHandle, "value").transform(nullablePrimitiveConverter);
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

				var currentId = modelHandle.get("value");
				if (currentId) {
					// value is the id
					var promise = store.get(modelHandle.get("value"));
					when(promise).then(function(result) {
						f.set("name", result[searchProperty]);
					});
				}
							
				return f;
			}
	})
});
