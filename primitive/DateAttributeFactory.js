define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/date/stamp",//
"./DateTextBox",//
"../schema/meta",//
"./dijitHelper",//
"./PrimitiveAttributeFactory"
], function(array, lang, declare, at, dateStamp, DateTextBox, meta, dijitHelper, PrimitiveAttributeFactory ) {

	return declare( [PrimitiveAttributeFactory], {
		
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
			schema["description"]="This is a textfield displaying dates. The values should be formatted according to ISO-8601. It is based on 'dijit.form.DateTextBox'";
			schema["example"]=dojo.toJson({code:'birthday',type:'date'},true);
			schema["instanceExample"]=dojo.toJson({birthday:"2013-01-31"},true);
			schema.properties=properties;
			properties.type={type:"string",required:true,"enum":["date"]};
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
