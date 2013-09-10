define([ "dojo/_base/declare","dojo/on",  "dojo/_base/lang", "dojo/_base/array", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin", 
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./decorator.html","dojox/mobile/ListItem"
], function(declare, on, lang, array, _WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template, ListItem) {
// module:
//		gform/mobile/DecoratorWidget

	return declare([ _WidgetBase, _Container ,_TemplatedMixin, _WidgetsInTemplateMixin ], {
		// summary:
		//		this widget container has a single child, which represents an attribute. This widget attaches provides the label and the state indicators for the attribute. 
		constructor:function(config) {
			this.inherited(arguments);
			lang.mixin(this,config);
			this.label=this.meta && (this.meta.label || this.meta.code) || "";
		},
		onClick: function(e) {
			array.forEach(this.getChildren(), function(child) {
				if (e.target!=child.domNode && child.onLabelClick) {
					child.onLabelClick(e);
				}
			}, this);
		},
		startup: function() {
			this.inherited(arguments);
			if (this.meta && this.meta.visible == false) {
				this.domNode.style.display="none";
			}
			this.own(
				on(this.domNode,"click", lang.hitch(this, "onClick"))
			);
		},
		templateString : template,
	
	});

});
