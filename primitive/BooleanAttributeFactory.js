define([
	"dojo/_base/declare",//
	"dojo/aspect",//
	"dojox/mvc/at",//
	"dijit/form/CheckBox",//
	"../schema/meta",//
	"./dijitHelper",//
	"../model/BooleanModel"
], function (declare, aspect, at, CheckBox, meta, dijitHelper, BooleanModel) {

	return declare([], {
		id: "boolean",
		handles: function (attribute) {
			return meta.isType(attribute, "boolean") && !attribute.array;
		},
		create: function (attribute, modelHandle) {
			if (!modelHandle) {
				throw new Error(" attribute " + attribute.code + " was not initialized");
			}
			var box = new CheckBox({
				"checked": at(modelHandle, "value")
			});
			// remove errors when value changes because this select does not validate.
			aspect.after(box, "onChange", function () {
				modelHandle.set("message", null);
				modelHandle.set("valid", true);
			});
			return box;

		},
		createModel: function (meta, plainValue) {
			var model = new BooleanModel();
			model.update(plainValue);
			return model;
		}
	});
});
