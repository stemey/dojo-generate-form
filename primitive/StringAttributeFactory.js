define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mvc/at",//
"./ValidationTextBox",//
"../meta",//
"./copyProperty",
"./copyDijitProperties",
"./mixinTextboxBindings"

], function(array, lang, declare, aspect, at, TextBox, meta,copyProperty,copyDijitProperties, mixinTextboxBindings) {

	return declare("app.TextAttributeFactory", [], {
		handles : function(attribute) {
			return meta.isType(attribute, "string") && !attribute.array;
		},
		create : function(attribute, modelHandle) {

			var props={
			}
			mixinTextboxBindings(modelHandle,props);
			copyProperty("pattern",attribute,props)
			copyDijitProperties(attribute,props);
			return new TextBox(props);

		}
	})
});
