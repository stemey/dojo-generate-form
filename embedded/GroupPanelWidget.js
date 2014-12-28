define(["dojo/_base/array", //
	"dojo/_base/lang",//
	"dojo/dom-class",
	"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
	"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
	"dojo/text!./polymorphic_embedded_attribute.html",
	"dijit/layout/StackContainer", "dojo/Stateful",
	"gform/Editor", "../layout/_LayoutMixin"//
], function (array, lang, domClass, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template, StackContainer, Stateful, Editor, _LayoutMixin) {

	return declare([_WidgetBase, _Container,
		_TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin], {
		templateString: template,
		typeStack: null,
		typeToGroup: null,
		ctx: null,
		doLayout: false,
		nullable: true,
		shown: true,
		show: function () {
			if (!this.shown) {
				this.shown = true;
				this.initTypeEditor(this.get("modelHandle").currentTypeCode);
				this.typeStack.selectedChildWidget.show();
			}
		},
		initTypeEditor: function (typeCode) {
			var group = this.groups.filter(function (g) {
				return g.code == typeCode;
			})[0];
			var editor = new Editor(
				{
					"doLayout": false,
					"modelHandle": this.get("modelHandle").getGroup(typeCode),
					"meta": group,
					"editorFactory": this.editorFactory,
					"shown": this.shown,
					ctx: this.ctx
				});
			this.typeStack.addChild(editor);
			editor.set("doLayout", this.doLayout);
			this.typeToGroup[typeCode] = editor;
			return editor;
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
					label: this.nullLabel || "",
					value: "null"
				});
			}

			var currentType = modelHandle.currentTypeCode;

			this.panelModel = new Stateful({
				title: "",
				validTypes: this.validTypeOptions,
				type: currentType || "null"
			});

			this.typeStack = new StackContainer({doLayout: false});
			this.typeToGroup = {};

			if (this.shown) {
				this.initTypeEditor(currentType);
			}

			this.modelHandle.watch("currentTypeCode", lang.hitch(this, "modelTypeChanged"));

			this.panelModel.watch("type", lang.hitch(this, "onTypeSelectorChanged"));
			this.addChild(this.typeStack);
			this.set("target", this.panelModel);
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
			if (!this.shown) {
				return;
			}
			if (newType === null) {
				if (this.modelHandle.currentTypeCode !== null) {
					domClass.replace(this.typeToGroup[this.modelHandle.currentTypeCode].domNode, "dijitHidden", "dijitVisible");
				}
			} else {
				var editor = this.typeToGroup[newType];
				if (!editor) {
					editor = this.initTypeEditor(newType);
				}
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
