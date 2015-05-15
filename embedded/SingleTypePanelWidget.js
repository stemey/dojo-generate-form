define([
    "dojo/_base/lang",
    "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./singletype_embedded_required_attribute.html",
    "dojo/Stateful", "../Editor",
    "../layout/_LayoutMixin", "dijit/form/CheckBox"
], function (lang, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, requiredTemplate, Stateful, Editor, _LayoutMixin) {

    return declare([ _WidgetBase, _Container,
        _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin ], {

        templateString: null,
        doLayout: true,
        required: false,
        constructor: function (config) {
            var attribute = config.meta;
            this.required = true;
            this.templateString = requiredTemplate;
        },
        postCreate: function () {
            this.inherited(arguments);
            var modelHandle = this.get("modelHandle");
            if (this.required && modelHandle.isEmpty()) {
                modelHandle.update({},true,false);
            }
            var attribute = this.get("meta");
            this.panelModel = new Stateful();
            this.panelModel.watch("hasValue", lang.hitch(this, "panelChanged"));
            this.panelModel.set("hasValue", !modelHandle.isNull);
            this.panelModel.set("title", "");
            modelHandle.watch("isNull", lang.hitch(this, "modelChanged"));

            // is not contained in layout container  so should take as much space as necessary -> doLayout=false
            this.editor = new Editor(
                {
                    doLayout: false,
                    "modelHandle": modelHandle,
                    "meta": attribute.group,
                    editorFactory: this.editorFactory,
                    "ctx": this.ctx
                });

            this.addChild(this.editor);
            this.set("target", this.panelModel);
        },

        getChildrenToValidate: function () {
            if (this.panelModel.get("hasValue")) {
                return this.inherited(arguments);
            } else {
                return [];
            }
        },

        modelChanged: function (propName, old, nu) {
            if (nu === true) {
                if (this.panelModel.get("hasValue") === true) {
                    this.panelModel.set("hasValue", false);
                }
            } else if (nu === false) {
                if (this.panelModel.get("hasValue") === false) {
                    this.panelModel.set("hasValue", true);
                }
            }
        },
        _switchedToNull: function () {
            this.containerNode.style.display = "none";
        },
        _switchedFromNull: function () {
            this.containerNode.style.display = "initial";
            if (this.getChildren().length === 1) {
                this.getChildren()[0].resize();
            }
        },
        panelChanged: function (propName, old, nu) {
            if (old === nu) {
                return;
            }
            var modelHandle = this.get("modelHandle");
            if (!this.panelModel.get("hasValue")) {
                this._switchedToNull();
                modelHandle.set("isNull", true);
            } else {
                this._switchedFromNull();
                modelHandle.set("isNull", false);
            }
        }

    });

});
