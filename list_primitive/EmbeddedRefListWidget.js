define([ "dojo/_base/lang", "dojo/_base/declare", "./EmbeddedListWidget", "../schema/meta",
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful",
		"dojo/text!./embedded_list_ref.html", "dijit/form/TextBox","../model/updateModelHandle", "dojo/i18n!../nls/messages"//
], function(lang, declare, EmbeddedListWidget,  Stateful,template, TextBox,updateModelHandle, messages) {

	return declare([ EmbeddedListWidget ], {
		templateString : template,
		createButton:null,
		_createElement : function() {
			var modelHandle=updateModelHandle.createMeta();
			updateModelHandle.cascadeAttribute(this.childAttribute,null,modelHandle,this.editorFactory);	
			this.target.value.push(modelHandle);
		},
		postCreate : function() {
			this.inherited(arguments);
			this.createButton.set("onClick", lang.hitch(this, "_createElement"));
		}
	});

});
