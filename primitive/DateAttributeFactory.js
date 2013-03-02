define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/date/stamp",//
"./DateTextBox",//
"../meta",//
], function(array, lang, declare, at, dateStamp, DateTextBox, meta) {

	return declare("app.DateAttributeFactory", [], {
		
		handles : function(attribute) {
			return attribute.type == "date" && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var box = this.createDateTextBox(modelHandle);
			
			if (attribute.required) {
				box.set("required", attribute.required);
			}
			if (attribute.readOnly) {
				box.set("readOnly", attribute.readOnly);
			}
			if (attribute.constraints) {
				box.set("constraints", attribute.constraints);
			}
			return box;
		},
		
		createDateTextBox : function(modelHandle) {
			var validConverter = this.createValidConverter();
			var validAt = at(modelHandle, "valid").transform(validConverter);

			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);
			
			return new DateTextBox({
				"value" : valueAt,
				"state" : validAt,
				"message" : at(modelHandle, "message")
			});
		},
		
		createValidConverter : function() {
			return {
				parse:function(state){
					return state!="Error";
				},
				format: function(valid){
					return valid?"":"Error";
				}
			};
		},
		
		createValueConverter : function() {
			return {
				parse : function(date) {
					isoDateString = date;
					if (typeof date != "string") {
						isoDateString = dateStamp.toISOString(date, {
							selector : "date"
						});
					}
					return isoDateString;
				}
			};
		}
	});
});
