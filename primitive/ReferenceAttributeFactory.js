define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojo/when",//
		"dojox/mvc/at",//
		"./FilteringSelect",//
		"./RefSelect",//
		"../schema/meta",//
		"./dijitHelper",
		"dojo/store/Memory",
		"dojo/store/JsonRest",
		"./refConverter",
		"./makeConverterDijitAware"
		],
		function(array, lang, declare, when, at, FilteringSelect, RefSelect, meta, dijitHelper, Memory, Store, refConverter, makeConverterDijitAware) {

	return declare(
			"gform.ReferenceAttributeFactory",
			[],
			{
			constructor: function(kwArgs) {
				lang.mixin(this, kwArgs);
			},
			handles : function(attribute) {
				return meta.isType(attribute,"ref")
						&& !attribute.array;
			},
			create : function(attribute, modelHandle, ctx) {

				if (typeof attribute.targetCreatable != "undefined") {
					var targetCreatable = attribute.targetCreatable;
				} else {
					var targetCreatable = true;
				}

				var idProperty = attribute.idProperty || "id";
				var searchProperty = attribute.searchProperty || "name";
				var props = {};
				dijitHelper.copyDijitProperties(attribute, props);
				var dijitAwareConverter = makeConverterDijitAware(refConverter);
				props["value"]=at(modelHandle, "value").transform(dijitAwareConverter);
				props["message"]=at(modelHandle, "message");
				props["state"]=at(modelHandle, "state");
				if (attribute.url) {	
					var store = ctx.getStore(attribute.url,
						{target: attribute.url,idProperty: idProperty	});
				} else if (attribute.values) {
					var store = new Memory({
						data: attribute.values, 
						idProperty: idProperty
					});
				} else {
					throw new Error("neither url nor values in attribute of type ref "+attribute.code);
				}
				props["store"]= store;
				props["searchAttr"]= searchProperty;
				props["labelAttr"]= searchProperty;

				dijitHelper.copyDijitProperties(attribute,props);
				var f = new FilteringSelect(props);
				dijitAwareConverter.dijit=f;
				

				var currentId = modelHandle.get("value");
				if (currentId) {
					// value is the id
					var promise = store.get(modelHandle.get("value"));
					when(promise).then(function(result) {
						if (result) {
							f.set("name", result[searchProperty]);
						}
					});
				}
							
				var refSelect = new RefSelect({targetCreatable: targetCreatable, meta: attribute, opener:ctx.opener,filteringSelect:f, editorFactory: this.editorFactory});
				return refSelect;
			},
		getSchema:function(){
			var schema={};
			schema["id"]="ref";
			var properties={};
			schema["description"]="This is a select displaying the labels od referenced entities. The autocomplete functionality allows searching through possible entities to associate. It is based on 'dijit.form.FilteringSelect'";
			schema["example"]=dojo.toJson({code:'firend',type:'ref', url:"/service/people", idProperty:"id",

 searchProperty: "name", schemaUrl:"/service/people?schema" },true);

			schema["instanceExample"]=dojo.toJson({ref: {$ref: "/services/people/1"}},true);
			schema.properties=properties;
			properties.type={type:"string",required:true,"enum":["ref"]};
			properties.url={type:"string",required:true,description:"the url of the restful resources assoicated with theis property."};
			properties.idProperty={type:"string",required:false,description:"the id property in the rest services json resources"};
			properties.searchProperty={type:"string",required:false,description:"the property displayed and matched against the user input."};
			properties.schemaUrl={type:"string",required:true,description:"the url to the schema of the referenced entity."};
			dijitHelper.addSchemaProperties(properties);
			dijitHelper.addSchemaProperty("required",properties);
			properties["readOnly"]={ type : "boolean"};
			dijitHelper.addSchemaProperty("missingMessage",properties);
			dijitHelper.addSchemaProperty("promptMessage",properties);
			dijitHelper.addSchemaProperty("placeHolder",properties);
			dijitHelper.addSchemaProperty("invalidMessage",properties);
			return schema;
		}
	})
});
