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
        return declare([PrimitiveAttributeFactory],
            {
                id: "multi-ref",
                constructor: function (kwArgs) {
                    lang.mixin(this, kwArgs);
                },
                handles: function (attribute) {
                    return meta.isType(attribute, "multi-ref") && attribute.schemas;
                },
                // summary:
                //      the attribute is like this:
                //      | types:[{code:"typeA","typeB"], searchUrl
                create: function (attribute, modelHandle, ctx) {
                    var schemaUrlPrefix=attribute.schemaUrlPrefix;
                    if (!schemaUrlPrefix) {
                        schemaUrlPrefix=""
                    }
                    var options = [];
                    var typeArray = [];
                    attribute.schemas.forEach(function (type) {
                        var option = {};
                        if (typeof type === "string") {
                            option.code = schemaUrlPrefix+type;
                            option.label = type;
                            typeArray.push(type);
                        } else {
                            option.code = schemaUrlPrefix+type.code;
                            option.label = type.label || type.code;
                            typeArray.push(type.code);
                        }
                        options.push(option);
                    });

                    var targetCreatable = true;
                    if (typeof attribute.targetCreatable !== "undefined") {
                        targetCreatable = attribute.targetCreatable;
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

                    var query = {};

                    var schemas = attribute.schemas.map(function (option) {
                        if (typeof option === "string") {
                            return option;
                        }else {
                            return option.code;
                        }
                    });
                    var typeProperty = attribute.typeProperty;
                    props.query=attribute.query || {};
                    if (schemas.length>0) {
                        props.query[typeProperty] = {$in: schemas};
                    }

                    dijitHelper.copyDijitProperties(attribute, props);
                    var f = new FilteringSelect(props);

                    dijitAwareConverter.dijit = f;

                    var openerParams = {
                        editorFactory: this.editorFactory,
                        schemaUrls:options,
                        typeProperty: attribute.typeProperty
                    };

                    var refSelect = new RefSelect({openerParams:openerParams, targetCreatable: targetCreatable, meta: attribute, opener: ctx.opener, filteringSelect: f, editorFactory: this.editorFactory});
                    return refSelect;
                }
            });
    });
