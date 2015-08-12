define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./ImageView.html",
    "./ViewMixin"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, ViewMixin) {

    return declare([_WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin, ViewMixin], {
        templateString: template,
        supports: function (file) {
            return typeof file === "string";
        },
        display: function (dataUrl) {
            this.sizeNode.innerHTML = this.calculateSize(dataUrl);
            this.imageNode.src =  dataUrl;
        }
    });

});
