define([
	"dojo/date/stamp",
	"dojo/_base/declare",
	"dojox/mvc/at",
	"./TimeTextBox",
	"../schema/meta",
	"./PrimitiveAttributeFactory"
], function (stamp, declare, at, TimeTextBox, meta, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "time",
		alwaysUseInvalidMessage: true,
		handles: function (attribute) {
			return meta.isType(attribute, "time") && !attribute.array;
		},

		create: function (attribute, modelHandle) {
			var box = this.createTimeTextBox(modelHandle);

			if (attribute.required) {
				box.set("required", attribute.required);
			}
			if (attribute.constraints) {
				box.set("constraints", attribute.constraints);
			}
			return box;
		},

		createTimeTextBox: function (modelHandle) {

			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);

			return new TimeTextBox({
				"value": valueAt,
				"state": at(modelHandle, "state"),
				"message": at(modelHandle, "message")
			});
		},

		createValueConverter: function () {
			return {
				parse: function (date) {
					var isoDateString = date;
					if (typeof date !== "string") {
						isoDateString = stamp.toISOString(date, {
							selector: "time"
						});
					}
					return isoDateString;
				},
				format: function (value) {
					return stamp.fromISOString(value);
				}
			};
		}

	});
});
