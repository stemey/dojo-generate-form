define([
	"dojo/_base/declare",
	"dojox/mvc/at",
	"./DateTextBox",
	"./dijitHelper",
	"./PrimitiveAttributeFactory"
], function (declare, at, DateTextBox, dijitHelper, PrimitiveAttributeFactory) {

	return declare([PrimitiveAttributeFactory], {
		id: "date",
		alwaysUseInvalidMessage: true,
		handles: function (attribute) {
			return attribute.type === "date";
		},

		create: function (attribute, modelHandle, ctx) {
			var valueConverter = this.editorFactory.getConverter(attribute, ctx);
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
		}
	});
});
