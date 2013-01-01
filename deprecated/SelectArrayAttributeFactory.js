define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"dojo/store/Memory",//
"dojox/mvc/StatefulArray",//
"./SelectArrayWidget",//
"dojox/mvc/sync",//
"./RepeatedSelectWidget",//
"dojox/mvc/WidgetList"//
], function(array, lang, declare, at, DecoratorWidget, Memory, StatefulArray,
		SelectArrayWidget, sync) {

	return declare("app.SelectArrayAttributeFactory", [], {

		handles : function(attribute) {
			return attribute.type.code == "text" && attribute.values != null
					&& attribute.array;
		},
		create : function(attribute, modelHandle) {
			var options = [];
			for ( var key in attribute.values) {
				var value = attribute.values[key];
				options.push({
					label : value,
					value : value
				});
			}
			
			
			var model = new dojo.Stateful();
			var items = new StatefulArray([]);
			items.set("primitiveArray",true);
			
			model.set("items", items);
			model.set("options", options);

			var select = new SelectArrayWidget({
				target : model
			});

			modelHandle.set(attribute.code, items);

			return select;

		}
	})
});
