define([ "dojo/_base/array", //
	"dojo/_base/lang",//
	"dojo/_base/declare",//
	"dojo/Stateful"//
], function (array, lang, declare, Stateful) {
// module:
//		gform/AttributeFactoryFinder

	return declare(Stateful, {
		// summary:
		//		Manages all attributeFactories.
		// description:
		//		used internally by EditorFactory.
		// tags:
		//		deprecated
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		attributeFactoryMap: {
		},
		addAttributeFactory: function (/*gform/api/AttributeFactory*/factory) {
			// summary:
			//		Add attributeFactory.
			// editor:
			//		the id referenced by schema attributes.
			// factory:
			//		the attributeFactory.
			this.attributeFactoryMap[factory.id] = factory;
		},
		getAttributeFactories: function () {
			// summary:
			//		get all registered factories. This does not include factories added solely by id.
			// returns: [gform/api/AttributeFactory]
			//		attributeFactories
			return this.attributeFactories;
		},
		getAttributeFactoryMap: function () {
			// summary:
			//		get the mapping of id to factoriy. 
			// returns: Object
			//		map of id to attributeFactory
			return this.attributeFactoryMap;
		},
		getFactory: function (attribute) {
			// summary:
			//		get factory for attribute.
			// attribute:
			//		the attribute to find a factory for 
			// returns: gform/api/AttributeFactory
			//		attributeFactory for attribute
			var factory = this.attributeFactoryMap[attribute.editor] || null;
			if (factory && factory.handles(attribute)) {
				return factory;
			}
			if (factory && attribute.array && !attribute.elementEditor) {
				// TODO this seems wrong. Don't change the schema.
				attribute.elementEditor = attribute.editor;
				delete attribute.editor;
			} else if (factory) {
				console.log("editor " + attribute.editor + " cannot handle attribute " + attribute.code);
				return null;
			}

			if (!factory) {
				var factories = array.filter(this.attributeFactories,
					function (af) {
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
