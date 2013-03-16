define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful"//
], function(array, lang, declare, Stateful ) {

	return declare("app.editor.AttributeFactoryFinder", Stateful, {
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		
		attributeFactoryMap : {
		},
		
		addAttributeFactory : function(id,factory) {
			this.attributeFactoryMap[id]=factory;
		},
		getAttributeFactories: function() {
			return this.attributeFactories;
		},		
		getAttributeFactoryMap: function() {
			return this.attributeFactoryMap;
		},		
		getFactory : function(attribute) {
			var factory = this.attributeFactoryMap[attribute.editor];
			// if (factory == null) {
			// factory = this.attributeFactoryMap[attribute.type.code];
			// }
			if (!factory) {
				var factories = array.filter(this.attributeFactories,
						function(af) {
							return af.handles && af.handles(attribute);
						});
				if (factories.length > 0) {
					factory = factories[0];
				}
			}
			return factory;
		}
	});
});
