define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/form/CurrencyTextBox",//
"../meta",//
"./dijitHelper",//
], function(array, lang, declare, at, CurrencyTextBox, meta, dijitHelper) {

	return declare( "gform.CurrencyAmountAttributeFactory", [], {
		handles : function(attribute) {
			return attribute.type="number" && !attribute.array;
		},
		
		create : function(attribute, modelHandle) {
			var valueConverter = this.createValueConverter();
			var valueAt = at(modelHandle, "value").transform(valueConverter);
			var props={
				constraints:{}
			}
			props["value"]=valueAt;
			props["state"]= at(modelHandle, "state");
			props["message"]=at(modelHandle, "message");
			dijitHelper.copyProperty("currency",attribute,props);
			dijitHelper.copyDijitProperties(attribute,props);
			dijitHelper.copyProperty("min",attribute,props.constraints)
			dijitHelper.copyProperty("max",attribute,props.constraints)
			return new CurrencyTextBox(props);
		},
		
		createValueConverter : function() {
			return {
				format : function(value) {
					if (value == null) {
						return null;
					} else {
						return value / 100;
					}
				},
				parse : function(value) {
					return Math.round(value * 100);
				}
			};
		},
			getSchema:function(){
				var schema={};
				schema["id"]="number";
				schema["description"]="This is a textfield for numerical amount with currency values based on 'dijit.form.NumberTextBox'.";
				schema["example"]=dojo.toJson({code:'name',type:'number',editor:"currencyamount",currency:"USD"},true);
				var properties={};
				properties.type={type:"string",required:true,enum:["number"]};
				dijitHelper.addSchemaProperties(properties);
				dijitHelper.addSchemaProperty("required",properties);
				dijitHelper.addSchemaProperty("maxLength",properties);
				properties.currency={type:"string",maxLength:3,pattern:"[A-Z]{3}",description:"The currency code according to ISO4217"};
				properties.min={type:"number",description:"the minimum value"};
				properties.max={type:"number",description:"the maximum value"};
				dijitHelper.addSchemaProperty("missingMessage",properties);
				dijitHelper.addSchemaProperty("promptMessage",properties);
				dijitHelper.addSchemaProperty("placeHolder",properties);
				dijitHelper.addSchemaProperty("invalidMessage",properties);

				schema.properties=properties;
				return schema;
			}
	});
	
});
