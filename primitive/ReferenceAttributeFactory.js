define(
	[
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"./FilteringSelect",//
		"./RefSelect",//
		"../schema/meta",//
		"./dijitHelper",
		"dojo/store/Memory",
		"./makeConverterDijitAware",
		"./PrimitiveAttributeFactory"
	],
	function (lang, declare, at, FilteringSelect, RefSelect, meta, dijitHelper, Memory, makeConverterDijitAware, PrimitiveAttributeFactory) {
		//
		return declare([PrimitiveAttributeFactory],
			{
				id: "ref",
				constructor: function (kwArgs) {
					lang.mixin(this, kwArgs);
				},
				handles: function (attribute) {
					return meta.isType(attribute, "ref")
						&& !attribute.array;
				},
				create: function (attribute, modelHandle, ctx) {
                    var targetCreatable = attribute.disabled!==true;
                    if (typeof attribute.targetCreatable !== "undefined") {
                        targetCreatable = attribute.targetCreatable;
                    }
                    if (!attribute.schemaUrl) {
                        targetCreatable=false;
                    }

					var refConverter = this.editorFactory.getConverter(attribute, ctx);

					var idProperty = attribute.idProperty || "id";
					var searchProperty = attribute.searchProperty || "name";
					var props = {};
					dijitHelper.copyDijitProperties(attribute, props);
					var dijitAwareConverter = makeConverterDijitAware(refConverter);
					props.value = at(modelHandle, "value").transform(dijitAwareConverter);
					props.message = at(modelHandle, "message");
					props.state = at(modelHandle, "state");
					var store;
					if (attribute.url) {
						store = ctx.getStore(attribute.url,
							{target: attribute.url, idProperty: idProperty    });
					} else if (attribute.values) {
						store = new Memory({
							data: attribute.values,
							idProperty: idProperty
						});
					} else {
						throw new Error("neither url nor values in attribute of type ref " + attribute.code);
					}
					props.store = store;
					props.searchAttr = searchProperty;
					props.labelAttr = searchProperty;

					dijitHelper.copyDijitProperties(attribute, props);
					var f = new FilteringSelect(props);
					dijitAwareConverter.dijit = f;

                    var openerParams={
                        editorFactory: this.editorFactory,
                        schemaUrl: attribute.schemaUrl
                    };

					var refSelect = new RefSelect({openerParams:openerParams,targetCreatable: targetCreatable, meta: attribute, opener: ctx.opener, filteringSelect: f, editorFactory: this.editorFactory});
					return refSelect;
				}
			});
	});
