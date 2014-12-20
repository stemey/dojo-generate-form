define([
	'./transforms/AddRegionTransformer',
	'dojo/_base/json',
    '../util/Resolver',
    './Transformer',
    "dojo/_base/declare",
    "dojo/text!./group.json",
    './transforms/FilterAttributesTransformer',
    './transforms/RemoveFirstGroupTransformer',
    './transforms/RemovePropertyFromGroupTransformer',
    './transforms/RemovePropertyFromGroupsTransformer'
], function (AddRegionTransformer, json, Resolver, Transformer, declare, group, FilterAttributesTransformer, RemoveFirstGroupTransformer, RemovePropertyFromGroupTransformer, RemovePropertyFromGroupsTransformer) {


    return declare("SchemaGenerator", [], {

        loadDefault: function (baseUrl) {
            var meta = json.fromJson(group);
            var t = this.createTransformer();
            return this.load(meta, baseUrl, t);
        },
        load: function (group, baseUrl, transformer) {
            var resolver = new Resolver({baseUrl: baseUrl, transformer: transformer});
            return resolver.resolve(group);
        },
        createTransformer: function () {
            var t = new Transformer();
            t.add(new FilterAttributesTransformer({id: "primitive", test: function (code) {
                return !/(object|array|map)/.test(code);
            }}));//["./primitive-attributes.json"] = {url: "./attributes.json", execute: filterPrimitives};
            t.add(new RemoveFirstGroupTransformer({id: "attributes-nocode"}));
            //}));t["./attributes-nocode.json"] = {url: "./attributes.json", execute: removeFirstGroupFromAttributes};
            t.add(new RemovePropertyFromGroupsTransformer({id: "nocode", deleteCodes: ["code"]}));
            //t["./groups-nocode.json"] = {url: "./groups.json", execute: removeCode};
            t.add(new RemovePropertyFromGroupsTransformer({id: "nolabel", deleteCodes: ["label"]}));
            //t["./group/listpane-nocode.json"] = {url: "./group/listpane.json", execute: removeCodeFromSingle};
            t.add(new RemovePropertyFromGroupTransformer({id: "nocode-group", deleteCodes: ["code"]}));
            //t["./groups-nocode-nolabel.json"] = {url: "./groups.json", execute: removeCodeAndLabel};
			t.add(new RemovePropertyFromGroupTransformer({id: "nocode-group", deleteCodes: ["code"]}));
			t.add(new AddRegionTransformer({id: "add-region"}));
            return t;
        }

    });


});
