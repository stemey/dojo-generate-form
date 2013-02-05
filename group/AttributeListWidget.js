define([ "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./attribute_list.html",
		"./_GroupMixin"//
], function(declare, lang, _WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template,_GroupMixin) {

	return declare("gform.AttributeListWidget",[ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin ,_GroupMixin], {
		constructor: function(kwArgs) {
			lang.mixin(this,kwArgs);
			this.description=this.meta.description||"";
		},
		templateString : template
	});

});
