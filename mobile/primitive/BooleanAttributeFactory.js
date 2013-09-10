define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojo/Stateful",//
"dojox/mvc/at",//
"./CheckBox",//
"../../schema/meta",//
"../../primitive/mixinTextboxBindings",
"../../primitive/dijitHelper"
], function(array, lang, declare, aspect, Stateful, at, CheckBox,  meta, mixinTextboxBindings, dijitHelper) {

	return declare( [], {
		handles : function(attribute) {
			return meta.isType(attribute, "boolean") && !attribute.array;
		},
		create : function(attribute, modelHandle) {	
			var props={
				"checked" : at(modelHandle,"value")
			};
			var box = new CheckBox(props);
			// remove errors when value changes because this select does not validate.
			aspect.after(box, "onChange", function() {
				modelHandle.set("message", null);
				modelHandle.set("valid", true);
			});	
			return box;

		}


	})
});
