define([
	"dojo/_base/declare",
	"dojox/mvc/at",
	"dojo/date/stamp",
	"./DateTextBox",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"
], function (declare, at, dateStamp, DateTextBox, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "date",
		alwaysUseInvalidMessage: true,
		handles: function (attribute) {
			return attribute.type === "date";
		},

		create: function (attribute, modelHandle) {
			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);

			var props = {
				"value": valueAt,
				"state": at(modelHandle, "state"),
				"message": at(modelHandle, "message")
			};



			dijitHelper.copyDijitProperties(attribute, props);
			dijitHelper.copyProperty("readOnly", attribute, props);

			if (attribute.constraints) {
				props.constraints = attribute.constraints;
			}

			var widget= new DateTextBox(props);
            widget.own(widget.on("blur", function(){
                modelHandle.validate();
            }));
            this.addDijitValidation(modelHandle,widget);
            return widget;
		},
		createValueConverter: function () {
			return {
				parse: function (date) {
					var isoDateString = date;
					if (typeof date !== "string") {
						isoDateString = dateStamp.toISOString(date, {
							selector: "date"
						});
					}
					return isoDateString;
				}
			};
		}
	});
});
