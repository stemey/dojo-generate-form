define(
    [
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojox/mvc/sync",
        "../PrimitiveAttributeFactory",
        "./Binary",
        "../../model/equals",
        "./ImageView",
        "./DownloadableView"
    ],
    function (lang, declare, sync, PrimitiveAttributeFactory, Binary, equals, ImageView, DownloadableView) {
        return declare([PrimitiveAttributeFactory],
            {
                id: "binary",
                config: {
                    baseUrl: null,
                    fileServerUrl: null,
                    maxSize:null
                },
                constructor: function (kwArgs) {
                    lang.mixin(this, kwArgs);
                },
                handles: function (attribute) {
                    return attribute.type === "binary" && !attribute.array;
                },
                create: function (attribute, modelHandle, ctx) {

                    var props = {};
                    lang.mixin(props, this.config);
                    lang.mixin(props, attribute);
                    var binary = new Binary(props);
                    binary.addViewer(new ImageView(props));
                    binary.addViewer(new DownloadableView(props));
                    sync(modelHandle, "value", binary, "value", {equals: equals});
                    sync(modelHandle, "state", binary, "state");
                    sync(modelHandle, "message", binary, "message");
                    return binary;

                }
            });
    }
);
