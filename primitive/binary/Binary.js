define(["dojo/_base/lang",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./Binary.html",
    "dojo/request",
    "dojo/Deferred"
], function (lang, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, request, Deferred) {

    return declare([_WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        inputFile: null,
        value: null,
        message: "",
        mimeTypes: null,// TODO
        // 10 MB
        maxSize: 10000000,
        fileServerUrl: null,
        stackContainer: null,
        mimeTypeHelper: null,
        fileModel: null,
        filename: null,
        postCreate: function () {
            this.inherited(arguments);
            this.inputFile.addEventListener("change", lang.hitch(this, "onFileChange"), false);
            this.watch("value", lang.hitch(this, "onValueChange"));
            if (this.fileModel != null) {
                this.filename = this.fileModel.getPlainValue();
            }
        },
        onValueChange: function () {
            this.stack.getChildren().some(function (viewer) {
                if (viewer.supports && viewer.supports(this.value)) {
                    //TODO for gihtub: data image prefix + btoa(file);
                    var data = this.value;
                    if (!this.useUrl()) {
                        data = this.mimeTypeHelper.getDataUrlPrefix(this.filename)+this.value;
                    }
                    viewer.display(data);
                    this.stack.selectChild(viewer);
                }
            }, this);
        },
        addViewer: function (viewer) {
            this.stack.addChild(viewer);
        },
        onFileChange: function (evt) {
            var file = evt.target.files[0];
            this.set("state", "");
            this.set("message", "");
            if (this.mimeTypes && this.mimeTypes.length > 0) {
                if (this.mimeTypes.indexOf(file.type) < 0) {
                    this.set("state", "Error");
                    this.set("message", "mime-type not allowed");
                }
            }
            if (this.state === "") {
                if (this.useUrl()) {
                    var me = this;
                    var urlPromise = this.upload(file);
                    urlPromise.then(function (url) {
                        me.set("value", {
                            size: file.size,
                            url: url,
                            name: file.name,
                            type: file.type,
                            lastModified: file.lastModifiedDate
                        });
                    });
                } else {
                    if (!this.useUrl()) {
                        this.filename = file.name;
                        if (this.fileModel && this.fileModel.isEmpty()) {

                            this.fileModel.update(file.name);
                        }
                    }
                    var reader = new FileReader();
                    var me = this;
                    reader.onload = function (event) {
                        var result = /^data:image\/([^;]+);base64,(.*)/.exec(event.target.result);
                        if (result && result.length == 3) {
                            me.set("value", result[2]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        useUrl: function () {
            return !!this.fileServerUrl;
        },
        upload: function (file) {
            var formData = new FormData();
            var fieldName = 'file';
            var exists = this.value && this.value.url;
            formData.append(fieldName, file);
            var headers = {};
            var options = {data: formData, headers: headers};

            headers["Content-Type"] = false;//"multipart/form-data";

            var promise = new Deferred();

            request.post(this.fileServerUrl, options).then(function (e) {
                promise.resolve(e);
            });
            return promise;


        }

    });

});
