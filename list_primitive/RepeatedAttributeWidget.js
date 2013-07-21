define([ "dojo/_base/lang", "dojo/_base/array", "dojo/_base/declare",
		"dijit/_WidgetBase", "dijit/_Container", "dijit/_TemplatedMixin",
		"../AttributeFactoryFinder",//
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful",
		"dojo/text!./repeated_attribute.html", "dijit/form/TextBox", "dojo/i18n!../nls/messages","../group/_DecoratorMixin","../group/_GroupMixin", "dojo/i18n", "dojo/i18n!../nls/messages"//
], function(lang, array, declare, _WidgetBase, _Container, _TemplatedMixin, AttributeFactoryFinder,
		_WidgetsInTemplateMixin, Stateful,template, TextBox, messages, _DecoratorMixin, _GroupMixin, i18n, messages) {

	return declare("gform.RepeatedAttributeWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin, _DecoratorMixin,  _GroupMixin ], {
		templateString : template,
		ctx: null,
		messages:messages,
		getOldValueMessage: function(old) {
			if (typeof old == "undefined" || old == null) {
				return messages["newElement"];
			} else {
				return this.inherited(arguments);
			}
		},	
		postCreate : function() {
			this.inherited(arguments);
			var attribute=this.get("meta");
			var panelModel = new dojo.Stateful();
			panelModel.set("title", "");
			//var me=this;
			var modelHandle = this.get("modelHandle");
	
			var singleAttribute={};
			lang.mixin(singleAttribute,attribute);
			singleAttribute.array=false;
			delete singleAttribute.editor;
			if (attribute.elementEditor) {
				singleAttribute.editor=attribute.elementEditor;
			}

			var factory = this.editorFactory.attributeFactoryFinder.getFactory(singleAttribute);
			var editor = factory.create(attribute, this.modelHandle, this.ctx);
			
			this.addChild(editor);
			this.set("target", panelModel);

			this.deleteButton.set("onClick", lang.hitch(this, "_delete"));
		},
		_delete : function(e) {
			var eventDispatcher = this.getParent();
			var index = this.getParent().getChildren().indexOf(this);
			if (index >= 0) {
				this.parent.children.splice(index, 1);
			}
			this.parent.emit("value-changed",{source:this});
			this.parent.emit("state-changed",{source:this});
		}
	});

});
