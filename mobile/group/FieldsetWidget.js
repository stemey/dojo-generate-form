define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./fieldset.html",
		"../../group/_GroupMixin","dojox/mobile/EdgeToEdgeList"//
], function(declare, lang, array,_WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin, template, _GroupMixin
) {
// module:
//		gform/AttributeListWidget
	

	return declare([ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin ,_GroupMixin], {
		// summary:
		//		A group widget displaying a list of attributes.
		constructor: function(kwArgs) {
			lang.mixin(this,kwArgs);
			this.description=this.meta.description||"";
		},
		templateString : template,
		destroy: function() {
			array.forEach(this.getChildren(),function(child) {
				child.destroy();
			});
			this.inherited(arguments);
		}
	});

});
