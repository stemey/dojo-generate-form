define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin", "../schema/meta",
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful",
		"dojo/text!./embedded_list_attribute.html", "dijit/form/TextBox","../model/updateModelHandle", "dojo/i18n!../nls/messages"//
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin, meta,
		_WidgetsInTemplateMixin,  Stateful,template, TextBox,updateModelHandle, messages) {

	return declare("app.EmbeddedListWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		attribute:null,
		childAttribute:null,
		messages:messages,
		_addElement : function() {
			var modelHandle=updateModelHandle.createMeta();
			updateModelHandle.cascadeAttribute(this.childAttribute,null,modelHandle,this.editorFactory);	
			this.target.value.push(modelHandle);
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});
