define([ "dojo/_base/lang", "dojo/_base/declare", "./EmbeddedListWidget", "dojo/Stateful",
		"dojo/text!./embedded_list_ref.html", "../model/updateModelHandle", "dojo/i18n!../nls/messages"//
], function(lang, declare, EmbeddedListWidget,  Stateful,template, updateModelHandle, messages) {
// module:
//		gform/list_primitive/RefListWidget
	return declare([ EmbeddedListWidget ], {
		// summary:
		//		The RefListWidget is a list of refs selectale in a dijit/form/FilteringSelect.
		templateString : template,
		// createButton:
		//		the button to open an editor and create a new member.
		createButton:null,
		_createElement : function() {
			this.opener.createSingle({
				url:this.attribute.url,
				schemaUrl:this.attribute.schemaUrl,
				editorFactory:this.editorFactory, 
				callback: lang.hitch(this, "onCreated")
			});
		},
		onCreated: function(id) {
			// summary:
			//		called from Editor when new entity is persisted. The created entity will be inserted into list.
			// id: String
			//		the id of the newly created.
			var modelHandle=updateModelHandle.createMeta();
			var converter = this.editorFactory.getConverter(this.attribute);
			var value = converter.parse(id);
			updateModelHandle.cascadeAttribute(this.childAttribute, value, modelHandle,this.editorFactory);	
			this.target.value.push(modelHandle);
		},
		postCreate : function() {
			this.inherited(arguments);
			this.createButton.set("onClick", lang.hitch(this, "_createElement"));
		}
	});

});
