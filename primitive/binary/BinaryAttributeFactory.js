define(
    [
        './MimeTypeHelper',
        './ImageDataView',
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojox/mvc/sync",
        "../PrimitiveAttributeFactory",
        "./Binary",
        "../../model/equals",
        "./ImageView",
        "./DownloadableView"
    ],
    function (MimeTypeHelper, ImageDataView, lang, declare, sync, PrimitiveAttributeFactory, Binary, equals, ImageView, DownloadableView) {
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
                    if (attribute.fileNameAttribute) {
                        props.fileModel=modelHandle.getModelByPath(attribute.fileNameAttribute);
                        if (!props.fileModel) {
                            console.error("cannot find file name model "+attribute.fileNameAttribute)
                        }

                    }

                    var binary = new Binary(props);
                    binary.mimeTypeHelper=this.editorFactory.getMimeTypeHelper();
                    binary.addViewer(new ImageView(props));
                    binary.addViewer(new DownloadableView(props));
                    binary.addViewer(new ImageDataView(props));
                    binary.own(sync(modelHandle, "value", binary, "value", {equals: equals}));
                    binary.own(sync(modelHandle, "state", binary, "state"));
                    binary.own(sync(modelHandle, "message", binary, "message"));
                    return binary;

                }
            });
    }
);
