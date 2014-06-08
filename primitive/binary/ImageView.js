define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./ImageView.html",
    "./ViewMixin"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, ViewMixin) {

    return declare([ _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin, ViewMixin ], {
        templateString: template,
        supports: function (file) {
            return (/^image/).test(file.type);
        },
        display: function (file) {
            this.sizeNode.innerHTML = this.calculateSize(file);
            this.imageNode.src = this.baseUrl+"/"+file.url;
        }
    });

});
