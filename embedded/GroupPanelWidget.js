define([ "dojo/_base/array", //
    "dojo/_base/lang",//
    "dojo/dom-class",
    "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./polymorphic_embedded_attribute.html",
    "dijit/layout/StackContainer", "dojo/Stateful",
    "gform/Editor", "../layout/_LayoutMixin"//
], function (array, lang, domClass, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template, StackContainer, Stateful, Editor, _LayoutMixin) {

    return declare([ _WidgetBase, _Container,
        _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin ], {
        templateString: template,
        typeStack: null,
        typeToGroup: null,
        doLayout: false,
        nullable: true,
        shown: true,
        show: function () {
            if (!this.shown) {
                this.shown = true;
                this.typeStack.selectedChildWidget.show();
            }
        },
        postCreate: function () {

            var modelHandle = this.get("modelHandle");
            this.validTypeOptions = array.map(this.groups,
                function (validType) {
                    return {
                        value: validType.code,
                        label: validType.label || validType.code
                    };
                });
            if (this.nullable) {
                this.validTypeOptions.push({
                    label: "null",
                    value: "null"
                });
            }

            var currentType = modelHandle.currentTypeCode;

            this.panelModel = new Stateful({
                title: "",
                validTypes: this.validTypeOptions,
                type: currentType
            });

            this.typeStack = new StackContainer({doLayout: false});
            this.typeToGroup = {};
            array.forEach(this.groups, function (group) {
                var editor = new Editor(
                    {
                        "doLayout": false,
                        "modelHandle": modelHandle.getGroup(group.code),
                        "meta": group,
                        "editorFactory": this.editorFactory,
                        "shown": group.code === currentType && this.shown
                    });
                this.typeStack.addChild(editor);
                editor.set("doLayout", this.doLayout);
                this.typeToGroup[group.code] = editor;
            }, this);

            this.modelHandle.watch("currentTypeCode", lang.hitch(this, "modelTypeChanged"));

            this.panelModel.watch("type", lang.hitch(this, "onTypeSelectorChanged"));
            //this.typeStack.selectChild(this.typeToGroup[currentType]);
            this.addChild(this.typeStack);
            this.set("target", this.panelModel);
            //this.switchType(currentType);
        },
        startup: function () {
            this.inherited(arguments);
            this.switchType(this.modelHandle.currentTypeCode);
        },
        modelTypeChanged: function (prop, old, nu) {
            if (old !== nu) {
                if (nu === null) {
                    nu = "null";
                }
                this.panelModel.set("type", nu);
            }
        },
        switchType: function (newType) {
            if (newType === null) {
                if (this.modelHandle.currentTypeCode !== null) {
                    domClass.replace(this.typeToGroup[this.modelHandle.currentTypeCode].domNode, "dijitHidden", "dijitVisible");
                }
            } else {
                var editor = this.typeToGroup[newType];
                domClass.replace(editor.domNode, "dijitVisible", "dijitHidden");
                editor.show();
                this.typeStack.selectChild(editor);
            }
        },
        onTypeSelectorChanged: function (propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (newValue === "null") {
                    newValue = null;
                }
                this.switchType(newValue);
                this.modelHandle.set("currentTypeCode", newValue);
            }
        }

    });

});
