define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dijit/layout/ContentPane",//
"../schema/meta"
], function(array, lang, declare, at, ContentPane, meta) {

	return declare("gform.MappedContentPaneFactory", [], {
		
		handles: function(attribute) {
			return !attribute.array && !attribute.attributes && !attribute.validTypes && !attribute.mapped_values
				&& attribute.mapped_attribute && attribute.url;
		},
		
		create : function(attribute, modelHandle, resolver) {
			var href = this._createHref(attribute, resolver);
			
			var contentPane = new ContentPane({
				href : href,
				style : "width: 100%"
			});
			
			resolver.watch(attribute.mapped_attribute,
				lang.hitch(this, "_onMappedAttributeChanged", contentPane, attribute, resolver));
			
			return contentPane;
		},
		
		_onMappedAttributeChanged : function(contentPane, attribute, resolver) {
			var href = this._createHref(attribute, resolver);
			contentPane.set("href", href);
		},
		
		_createHref : function(attribute, resolver) {
			var mappedValue = resolver.get(attribute.mapped_attribute);
			
			var href = attribute.url;
			if (mappedValue) {
				href = href + "?mappedValue=" + mappedValue;
			}
			return href;
		}
	});
});
