define([ "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./layoutMixinWidget.html",
		"../_LayoutMixin"
], function(declare, lang,_WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template,_LayoutMixin) {

	return declare([ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin ], {
		templateString : template,
	
	});

});
