define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin", "../meta",
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful",
		"dojo/text!./embedded_list_attribute.html", "dijit/form/TextBox","../updateModelHandle"//
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin, meta,
		_WidgetsInTemplateMixin,  Stateful,template, TextBox,updateModelHandle) {

	return declare("app.EmbeddedListWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		attribute:null,
		_addElement : function() {
			var modelHandle=updateModelHandle.createMeta();
			updateModelHandle.cascadeAttribute(this.attribute,null,modelHandle,this.editorFactory);	
			this.target.value.push(modelHandle);
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});
