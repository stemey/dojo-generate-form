define([ "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./attribute_list.html",
		"./_GroupMixin"//
], function(declare, _WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template,_GroupMixin) {

	return declare("gform.ListPaneGroupWidget",[ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin ,_GroupMixin], {
		templateString : template
	});

});
