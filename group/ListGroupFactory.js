define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./ListPane"//
], function(array, lang, declare, ListPane) {

	return declare("gform.ListGroupFactory", null, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		
		create : function(group, modelHandle) {
			var listWidget = new ListPane({
				meta:group
			});
			
			array.forEach(group.groups, function(childGroup) {
				var groupWidget = this.editorFactory.create(childGroup, modelHandle);
				listWidget.addChild(groupWidget);
			}, this);
			
			return listWidget;
		},
		collectAttributes: function(group) {
			var attributes=[];
			array.forEach(group.groups, function(group) {
				array.forEach(group.attributes, function(attribute) {
					attributes.push(attribute);
				},this);
			},this);
			return attributes;
		},
		getSchema: function() {
			var properties= {
				"label":{"type":"string",description:"for display in a tab"},
				"description":{"type":"string"},
				"groups":{"$ref":"groups"}
			}
			var schema={description:"The listgroup displays an array of groups in a list."};
			schema.properties=properties;
			schema.required=["groups"];
			var example={groupType:"listgroup",label:"Tab name for display in tab",groups:[{groupType:"titlepane",title:"1.",attributes:[]}]};	
			schema.example=dojo.toJson(example,true);
			return schema;	
		}
	});
});
