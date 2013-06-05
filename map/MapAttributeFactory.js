define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/json",//
"dojo/_base/declare",//
], function(array, lang, json,declare) {
// module: 
//		gform/embedded/EmbeddedAttributeFactory
	return declare([],{
		// summary:
		//		This AttributeFactory create the widget for single embedded attributes.
		handles: function(attribute, modelHandle) {
			return attribute.map && attribute.validTypes;
		},
		updateModelHandle: function(attribute, plainValue, modelHandle) {
			var attributeMeta = {};
			lang.mixin(attributeMeta, attribute);
			attributeMeta.array=true;
			attributeMeta.map=false;
			var keyAttribute = {type: "string", code: "__key", required: true};
			var xTypes= array.map(attribute.validTypes, function(type) {
				if (!type.attributes) {
					throw new Error("cannot handle group of groups");
				}
				var xtype = {};
				lang.mixin(xtype, type);
				var xattributes = array.map(type.attributes, function(attribute) {
					return attribute;
				});
				xtype.attributes= xattributes;
				xtype.attributes.push(keyAttribute);
				xtype.uniqueItems = xtype.uniqueItems || [];
				xtype.uniqueItems.push(keyAttribute.code);
				return xtype; 
			});			
			attributeMeta.validTypes= xTypes;
				
			

			var mapHandle = updateModelHandle.createMeta();
			updateModelHandle.updateArray(attributeMetaData, plainArray, modelHandle);


		},
		getPlainValue: function(modelHandle) {
			
		}
		
	})
});
