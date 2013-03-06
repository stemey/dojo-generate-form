define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/aspect",//
"./Select",//
"../updateModelHandle",//
"../meta",//
"./createOptions",//
"./nullablePrimitiveConverter" ], function(array, lang, declare, at, aspect,
		Select, updateModelHandle, meta, createOptions,
		nullablePrimitiveConverter) {

	return declare("gform.SelectAttributeFactory", [], {

		handles : function(attribute) {
			var values = meta.getTypeAttribute(attribute, "values");
			return !attribute.array && values != null && values.length > 0;
		},

		create : function(attribute, modelHandle) {
			var options = createOptions(attribute, true);

			var valueBinding = at(modelHandle, "value").transform(
					nullablePrimitiveConverter);

			var select = new Select({
				"value" : valueBinding,
				options : options,
				style : "width:200px;"
			});

			// remove errors when value changes because this select does not validate.
			aspect.after(select, "onChange", function() {
				modelHandle.set("message", null);
				modelHandle.set("valid", true);
			});

			if ( options.length == 1 || (modelHandle.get("value") == null && attribute.required==true)) {
					modelHandle.set("value", options[0].value);
			}
			return select;

		},
		updateModelHandle : function(meta, plainValue, modelHandle) {
			updateModelHandle.updateNullableString(meta, plainValue,
					modelHandle);
		}
	});

});
