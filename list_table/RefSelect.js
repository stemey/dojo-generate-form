define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		 "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./refselect.html"
], function(lang, declare, _WidgetBase, _TemplatedMixin,
		_WidgetsInTemplateMixin, template) {

	return declare([ _WidgetBase,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		constructor: function(kwargs) {
			lang.mixin(this,kwargs);
		},
		templateString: template,
		opener:null,
		selectContainer:null,
		meta: null,
		startup: function() {
			new FilteringSelect(this.filteringSelect).placeAt(this.selectContainer);
			this.inherited(arguments);
		},
		openref: function() {
			var ref = this.select.get("value");
			var url = this.meta.baseUrl+ref;
			this.opener.openSingle(url, this.meta.schemaUrl);
		},
	});

});
