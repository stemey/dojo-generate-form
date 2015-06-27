define(['dijit/Tooltip',
	"dojo/_base/array", //
	"dojo/_base/lang",//
	"dojo/dom-class",
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/Stateful",
	"../Editor",
	"gform/layout/_InvisibleMixin",
	"dijit/layout/BorderContainer",
	"../widget/GroupSelect",
	"dijit/layout/StackContainer"
], function (Tooltip, array, lang, domClass, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Stateful, Editor) {

	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		typeStack: null,
		typeToGroup: null,
		ctx: null,
		doLayout: false,
		nullable: true,
		shown: true,
		tooltip: null,
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
					"ctx": this.ctx
				});
			this.typeStack.addChild(editor);
			editor.set("doLayout", this.doLayout);
			this.typeToGroup[typeCode] = editor;
			this._updateDescription(this.descriptions[typeCode]);
			return editor;
		},
		postCreate: function () {
			this.tooltip = new Tooltip({
				connectId: [this.descriptionNode],
				label: ""
			});
			var modelHandle = this.get("modelHandle");
			this.descriptions = {};
			this.descriptions = {};
			this.groups.forEach(function (group) {
				this.descriptions[group.code] = group.editorDescription;
			}, this);
			this.validTypeOptions = array.map(this.groups,
				function (validType) {
					var option = {
						value: validType.code,
						label: validType.label || validType.code

					};
					if (validType.groupLabel) {
						option.group = validType.groupLabel;
					}
					return option;
				}, this);
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

			//this.typeStack = new StackContainer({doLayout: true});
			this.typeToGroup = {};

			if (this.shown) {
				this.initTypeEditor(currentType);
			}

			this.own(this.modelHandle.watch("currentTypeCode", lang.hitch(this, "modelTypeChanged")));

			this.own(this.panelModel.watch("type", lang.hitch(this, "onTypeSelectorChanged")));
			//this.addChild(this.typeStack);
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
				this._updateDescription(null);
				if (this.typeStack.selectedChildWidget) {
					domClass.replace(this.typeStack.selectedChildWidget.domNode, "dijitHidden", "dijitVisible");
				}
			} else {
				this._updateDescription(this.descriptions[newType]);
				var editor = this.typeToGroup[newType];
				if (!editor) {
					editor = this.initTypeEditor(newType);
				}
				domClass.replace(editor.domNode, "dijitVisible", "dijitHidden");
				editor.show();
				this.typeStack.selectChild(editor);
			}
		},
		_updateDescription: function (description) {
			if (description) {
				this.descriptionNode.style.display = "initial";
				this.tooltip.set("label", description);
			} else {
				this.descriptionNode.style.display = "none";
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
