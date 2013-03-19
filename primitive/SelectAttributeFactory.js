define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojo/aspect",//
"./Select",//
"../updateModelHandle",//
"../meta",//
"./createOptions",//
"./nullablePrimitiveConverter" ,//
"./dijitHelper" 
], function(array, lang, declare, at, aspect,
		Select, updateModelHandle, meta, createOptions,
		nullablePrimitiveConverter, dijitHelper) {

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

			return select;

		},
		updateModelHandle : function(meta, plainValue, modelHandle) {
			updateModelHandle.updateSelectModelHandle(meta, plainValue, modelHandle,createOptions(meta,true));
		},
		getSchema:function(){
			var schema={};
			schema["id"]="select";
			var properties={};
			schema["description"]="This is a select field. The options are specified as an array of label value pairs and or values. It is based on 'dijit.form.Select'";
			schema["example"]=dojo.toJson({code:'name',type:'string',values:[{label:"Mr.",value:"Mr"},"Mrs."]},true);
			schema.properties=properties;
			properties.values={type:"array",items:{type:"string"}};	
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required",properties);
			dijitHelper.addSchemaProperty("promptMessage",properties);
			dijitHelper.addSchemaProperty("placeHolder",properties);
			dijitHelper.addSchemaProperty("invalidMessage",properties);
			return schema;
		}	
	});

});
