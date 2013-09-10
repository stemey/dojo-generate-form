define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mobile/View", //
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dojo/text!./SubView.html",
"dojox/mobile/Heading",//
"dojox/mobile/ToolBarButton",//
], function(array, lang, declare, aspect, View, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

	return declare( [View, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template,
		ctx:null,
	   back: function (event) {
        // summary:
        //      Show DateOpener
				this.ctx.back();
	    }
	});
})
