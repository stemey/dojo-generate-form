define([ "dojo/_base/lang",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./Binary.html",
    "dojo/request",
    "dojo/Deferred"
], function (lang, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, request, Deferred) {

    return declare([ _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: template,
        inputFile: null,
        value: null,
        message: "",
        mimeTypes: null,
        // 10 MB
        maxSize: 10000000,
        fileServerUrl: null,
        stackContainer: null,
        postCreate: function () {
            this.inherited(arguments);
            this.inputFile.addEventListener("change", lang.hitch(this, "onFileChange"), false);
            this.watch("value", lang.hitch(this, "onValueChange"));
        },
        onValueChange: function () {
            this.stack.getChildren().some(function (viewer) {
                if (viewer.supports && viewer.supports(this.value)) {
                    viewer.display(this.value);
                    this.stack.selectChild(viewer);
                }
            }, this);
            //this.imageView.set("src", this.value.url);
            //this.imageView.set("size", this.value.size);
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
                var me = this;
                var urlPromise = this.upload(file);
                urlPromise.then(function (url) {
                    me.set("value", {size: file.size, url: url, name: file.name, type: file.type, lastModified: file.lastModifiedDate});
                });
            }
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
