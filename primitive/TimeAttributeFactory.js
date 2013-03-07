define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/date/stamp",//
"./TimeTextBox",//
"../meta",//
], function(array, lang, declare, at, dateStamp, TimeTextBox, meta) {

	return declare("app.TimeAttributeFactory", [], {
		
		handles : function(attribute) {
			return meta.isType(attribute, "time") && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var box = this.createTimeTextBox(modelHandle);
			
			if (attribute.required) {
				box.set("required", attribute.required);
			}
			if (attribute.constraints) {
				box.set("constraints", attribute.constraints);
			}
			return box;
		},
		
		createTimeTextBox : function(modelHandle) {

			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);
			
			return new TimeTextBox({
				"value" : valueAt,
				"state" : at(modelHandle, "state"),
				"message" : at(modelHandle, "message")
			});
		},
		
		createValueConverter : function() {
			return {
				parse : function(date) {
					isoDateString = date;
					if (typeof date != "string") {
						isoDateString = dateStamp.toISOString(date, {
							selector : "time"
						});
					}
					return isoDateString;
				}
			};
		}
	});
});
