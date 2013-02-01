define([ "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./decorator.html",
		"dijit/Tooltip","./_DecoratorMixin"
], function(declare, lang,_WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template,Tooltip,_DecoratorMixin) {

	return declare("app.DecoratorWidget",[ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin,_DecoratorMixin ], {
		templateString : template,
	
	});

});
