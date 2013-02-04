define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./list_primitive/PrimitiveListAttributeFactory",//
"./primitive/StringAttributeFactory",//
"./primitive/BooleanAttributeFactory",//
"./primitive/SelectAttributeFactory",//
"./primitive/MappedSelectAttributeFactory",//
"./primitive/DateAttributeFactory",//
"./embedded/EmbeddedAttributeFactory",//
"./primitive/NumberAttributeFactory",//
"./group/AttributeListWidget",//
"./list_embedded/RepeatedEmbeddedAttributeFactory",//,
"./list_table/RepeatedEmbeddedAttributeFactory"

], function(array, lang, declare, PrimitiveListAttributeFactory,StringAttributeFactory,
		BooleanAttributeFactory, SelectAttributeFactory,
		MappedSelectAttributeFactory, DateAttributeFactory, 
		EmbeddedAttributeFactory, NumberAttributeFactory, 
		AttributeListWidget, RepeatedEmbeddedAttributeFactory,TableListAttributeFactory) {

	return declare("app.editor.AttributeFactoryFinder",
			null, {
				constructor : function(kwArgs) {
					lang.mixin(this, kwArgs);
					this.attributeFactories = [ //
					       				new RepeatedEmbeddedAttributeFactory({editorFactory:this.editorFactory}),//
					       				new EmbeddedAttributeFactory({editorFactory:this.editorFactory}),//
					       				new PrimitiveListAttributeFactory({editorFactory:this.editorFactory}),//
					       				new NumberAttributeFactory({editorFactory:this.editorFactory}),//
					       				new SelectAttributeFactory({editorFactory:this.editorFactory}), // 
					       				new BooleanAttributeFactory({editorFactory:this.editorFactory}), // 
					       				new StringAttributeFactory({editorFactory:this.editorFactory}), //
					       				new DateAttributeFactory({editorFactory:this.editorFactory}) //
					       				];
					this.attributeFactoryMap["table"]=new TableListAttributeFactory({editorFactory:this.editorFactory});
				},
				attributeFactoryMap : {
				},
				addFactory : function(factory) {
					this.attributeFactories.push(factory);
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
			})

});
