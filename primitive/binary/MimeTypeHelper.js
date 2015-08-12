define([
    "dojo/_base/declare"
], function (declare) {

    return declare(null, {
        constructor: function (m) {
            if (m) {
                this.mappings = m;
            }
        },
        mappings: {
            png: "image/png",
            jpg: "image/jpg",
            gif: "image/gif",
            pdf: "application/pdf"
        },
        getExtension: function (filename) {
            var result = filename.match(/\.(.*)$/);
            if (result) {
                return result[1];
            } else {
                return null;
            }
        },
        getMimeType: function (filename) {
            return this.mappings[this.getExtension(filename)];
        },
        getDataUrlPrefix: function (filename) {
            return "data:" + this.getMimeType(filename) + ";base64,";
        }

    });

});
