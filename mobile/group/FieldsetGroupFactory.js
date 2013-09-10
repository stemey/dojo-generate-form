define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"../../group/GroupFactory",//
"./FieldsetWidget",//
"dojox/mobile/EdgeToEdgeList",

], function(array, lang, declare, GroupFactory,  FieldsetWidget, EdgeToEdgeList) {

	return declare([GroupFactory], {
		createWidget : function(group) {
			var pane = new EdgeToEdgeList();
			return pane;
	},
		getSchema: function() {
				var properties= {"label":{"type":"string", description: "displayed in a tab."},"description":{"type":"string", description: "displayed above the attributes."},"attributes":{"$ref":"attributes"}}
			var schema={description:"The listpane displays an array of attributes in a list. It is useful inside dijit layout containers because it wraps its content in a 'dijit.layout.ContentPane'."};
			schema.properties=properties;
			schema.required=["attributes"];
			var example={groupType:"listpane",label:"Tab name for display in tab",attributes:[{code:"name",type:"string"}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	
		}
	})
});
