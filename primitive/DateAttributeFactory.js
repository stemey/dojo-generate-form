define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/date/stamp",//
"./DateTextBox",//
"../meta",//
"./dijitHelper"
], function(array, lang, declare, at, dateStamp, DateTextBox, meta, dijitHelper ) {

	return declare("app.DateAttributeFactory", [], {
		
		handles : function(attribute) {
			return attribute.type == "date" && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);

			var props ={
				"value" : valueAt,
				"state" : at(modelHandle, "state"),
				"message" : at(modelHandle, "message")
			};

			dijitHelper.copyDijitProperties(attribute,props);
			dijitHelper.copyProperty("readOnly",attribute,props);

			if (attribute.constraints) {
				props.constraints = attribute.constraints;
			}
			
			return new DateTextBox(props);
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
		},
		getSchema:function(){
			var schema={};
			schema["id"]="date";
			var properties={};
			schema["description"]="This is a textfield displaying dates. It is based on 'dijit.form.DateTextBox'";
			schema["example"]=dojo.toJson({code:'name',type:'date'},true);
			schema.properties=properties;
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required",properties);
			properties["readOnly"]={ type : "boolean"};
			dijitHelper.addSchemaProperty("missingMessage",properties);
			dijitHelper.addSchemaProperty("promptMessage",properties);
			dijitHelper.addSchemaProperty("placeHolder",properties);
			dijitHelper.addSchemaProperty("invalidMessage",properties);
			return schema;
		}	
	});
});
