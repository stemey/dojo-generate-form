define([
	'dojo/Stateful',
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_Container",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./repeated_attribute.html",
	"dojo/i18n!../nls/messages",
	"../group/_DecoratorMixin",
	"dojo/i18n!../nls/messages"
], function (Stateful, lang, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template, messages, _DecoratorMixin, messages) {

	return declare("gform.RepeatedAttributeWidget", [ _WidgetBase, _Container,
		_TemplatedMixin, _WidgetsInTemplateMixin, _DecoratorMixin ], {
		templateString: template,
		ctx: null,
		messages: messages,
		getOldValueMessage: function (old) {
			if (typeof old === "undefined" || old == null) {
				return messages.newElement;
			} else {
				return this.inherited(arguments);
			}
		},
		postCreate: function () {
			this.inherited(arguments);
			var attribute = this.get("meta");
			var panelModel = new Stateful();
			panelModel.set("title", "");

			var singleAttribute = {};
			lang.mixin(singleAttribute, attribute);
			singleAttribute.array = false;
			delete singleAttribute.editor;
			if (attribute.elementEditor) {
				singleAttribute.editor = attribute.elementEditor;
			}

			var factory = this.editorFactory.attributeFactoryFinder.getFactory(singleAttribute);
			var editor = factory.create(attribute, this.modelHandle, this.ctx);

			this.addChild(editor);
			this.set("target", panelModel);

			this.deleteButton.set("onClick", lang.hitch(this, "_delete"));
		},
		_delete: function () {
			var index = this.getParent().getChildren().indexOf(this);
			if (index >= 0) {
				this.parent.children.splice(index, 1);
			}
			this.parent.emit("value-changed", {source: this});
			this.parent.emit("state-changed", {source: this});
		}
	});

});
