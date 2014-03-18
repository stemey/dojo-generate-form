define([ "dojo/_base/lang", "dojo/_base/declare", "./EmbeddedListWidget",
	"dojo/text!./embedded_list_ref.html"
], function (lang, declare, EmbeddedListWidget, template) {
// module:
//		gform/list_primitive/RefListWidget
	return declare([ EmbeddedListWidget ], {
		// summary:
		//		The RefListWidget is a list of refs selectale in a dijit/form/FilteringSelect.
		templateString: template,
		// createButton:
		//		the button to open an editor and create a new member.
		createButton: null,
		_createElement: function () {
			this.opener.createSingle({
				url: this.attribute.element.url,
				schemaUrl: this.attribute.element.schemaUrl,
				editorFactory: this.editorFactory,
				callback: lang.hitch(this, "onCreated")
			});
		},
		onCreated: function (id) {
			// summary:
			//		called from Editor when new entity is persisted. The created entity will be inserted into list.
			// id: String
			//		the id of the newly created.


            var value = this.converter ? this.converter.parse(id) : id;
            this.target.push(value);
		},
		postCreate: function () {
			this.inherited(arguments);
			this.createButton.set("onClick", lang.hitch(this, "_createElement"));
		}
	});

});
