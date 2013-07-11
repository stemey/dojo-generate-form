define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		 "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./refSelect.html"
], function(lang, declare, _WidgetBase, _TemplatedMixin,
		_WidgetsInTemplateMixin, template) {

	return declare([ _WidgetBase,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		constructor: function(kwargs) {
			lang.mixin(this,kwargs);
		},
		templateString: template,
		opener:null,
		filteringSelect: null,
		editorFactory: null,
		selectContainer:null,
		meta: null,
		editButton:null,
		postCreate: function() {
			this.inherited(arguments);
			this.editButton.on("click", lang.hitch(this, "openref"));
			this.createButton.on("click", lang.hitch(this, "createref"));
			this.filteringSelect.watch("value", lang.hitch(this, "updateState"));
			this.filteringSelect.watch("state", lang.hitch(this, "updateState"));
		},
		startup: function() {
			this.filteringSelect.placeAt(this.selectContainer);
			this.filteringSelect.startup();
			this.inherited(arguments);
			this.updateState();
		},
		updateState: function() {
			var editPossible = this.filteringSelect.state!="Error" && !!this.filteringSelect.value;
			this.editButton.set("disabled", !editPossible);
		},
		openref: function() {
			var ref = this.filteringSelect.get("value");
			var url = (this.meta.baseUrl || "")+ref;
			this.opener.openSingle({url:url, schemaUrl:this.meta.schemaUrl, editorFactory:this.editorFactory});
		},
		createref: function() {
			var url = this.meta.collectionUrl;
			this.opener.createSingle({url: this.meta.collectionUrl, schemaUrl:this.meta.schemaUrl, editorFactory:this.editorFactory});

		},
	});

});
