define([ "dojo/_base/array", 
"dojo/_base/lang",
"dojo/_base/declare",
"dojox/mvc/at",
"dijit/form/Select",
"./_MappedSelectAttributeFactoryBase",
"../schema/meta",
"../model/PrimitiveModel",
"./dijitHelper",
"dojo/text!./mapped_select.json",
"dojo/text!./mapped_select_doc.json"
], function(array, lang, declare, at, Select, _MappedSelectAttributeFactoryBase, meta, PrimitiveModel, dijitHelper, example,exampleForDoc) {

	return declare([ _MappedSelectAttributeFactoryBase ], {
		
		handles: function(attribute) {
			//var mapped_values=attribute.mapped_values;
			return attribute.type=="mapped-select";
		},
		
		create : function(attribute, modelHandle) {
			var options = this._createMappedOptions(modelHandle, attribute);
			
			var select = new Select({
				value : at(modelHandle, "value"),
				options : options,
				maxHeight: -1
			});
			
			if (attribute.required && !modelHandle.getPlainValue()) {
				modelHandle.update(options[0].value);
			}
			
			modelHandle.watchParent(attribute.mapped_attribute, 
					lang.hitch(this, "_onMappedAttributeChanged", modelHandle, select, attribute));
			
			
			return select;
		},
		
		_onMappedAttributeChanged : function(modelHandle, select, attribute) {
			var options = this._createMappedOptions(modelHandle, attribute);
			
			var valueValid = false;
			for (var key in options) {
				var option = options[key];
				if (option.value == modelHandle.value) {
					valueValid=true;
				}
			}
			
			
			
			select.set("options", options);
			if (options.length==0) {
				modelHandle.update(null);
			}else	if (!valueValid) {
				modelHandle.update(options[0].value);
			}
		},
		createModel : function(meta, plainValue) {
			var model = new PrimitiveModel();
			model.update(plainValue);
			return model;
		},
		getSchema:function(){
			var schema={};
			schema["id"]="mapped-select";
			var properties={};
			schema["description"]="This is a select field whose options depend on the value of another attribute. The options are specified as an array of label value pairs and or values. It is based on 'dijit.form.Select'";
			schema["example"]=example;
			schema["exampleForDoc"]=exampleForDoc;
			schema.properties=properties;
			properties.type={type:"string",required:true,"enum":["string"]};
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
