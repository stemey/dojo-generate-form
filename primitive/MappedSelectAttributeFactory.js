define([ "dojo/_base/array", 
"dojo/_base/lang",
"dojo/_base/declare",
"dojox/mvc/at",
"dijit/form/Select",
"./_MappedSelectAttributeFactoryBase",
"../meta",
"../updateModelHandle",
"./dijitHelper",
"dojo/text!./mapped_select.json",
"dojo/text!./mapped_select_doc.json"
], function(array, lang, declare, at, Select, _MappedSelectAttributeFactoryBase, meta, updateModelHandle, dijitHelper, example,exampleForDoc) {

	return declare("gform.MappedSelectAttributeFactory", [ _MappedSelectAttributeFactoryBase ], {
		
		handles: function(attribute) {
			var mapped_values=attribute.mapped_values;
			return !attribute.array && mapped_values;
		},
		
		create : function(attribute, modelHandle, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			
			var select = new Select({
				value : at(modelHandle, "value"),
				options : options,
				style : "width:200px;"
			});
			
			if (attribute.required && !modelHandle.value) {
				modelHandle.set("value",options[0].value);
			}
			
			resolver.watch(attribute.mapped_attribute, 
					lang.hitch(this, "_onMappedAttributeChanged", modelHandle, select, attribute, resolver));
			
			
			return select;
		},
		
		_onMappedAttributeChanged : function(modelHandle, select, attribute, resolver) {
			var options = this._createMappedOptions(attribute, resolver);
			
			var valueValid = false;
			for (var key in options) {
				var option = options[key];
				if (option.value == modelHandle.value) {
					valueValid=true;
				}
			}
			
			
			
			select.set("options", options);
			if (!valueValid) {
				modelHandle.set("value", options[0].value);
			}
		},
		updateModelHandle : function(meta, plainValue, modelHandle,resolver) {
			var options = this._createMappedOptions(meta, resolver);
			updateModelHandle.updateSelectModelHandle(meta, plainValue, modelHandle,options);
		},
		getSchema:function(){
			var schema={};
			schema["id"]="mapped-select";
			var properties={};
			schema["description"]="This is a select field whose options depend on the value of another attribute. The options are specified as an array of label value pairs and or values. It is based on 'dijit.form.Select'";
			schema["example"]=example;
			schema["exampleForDoc"]=exampleForDoc;
			schema.properties=properties;
			properties.type={type:"string",required:true,enum:["string"]};
			properties.mapped_values=dijitHelper.getMappedValuesSchema();	
			properties.mapped_attribute={type:"string",description:"the name of a sibling property"};	
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required",properties);
			dijitHelper.addSchemaProperty("promptMessage",properties);
			dijitHelper.addSchemaProperty("placeHolder",properties);
			dijitHelper.addSchemaProperty("invalidMessage",properties);
			return schema;
		}
		
	});
});
