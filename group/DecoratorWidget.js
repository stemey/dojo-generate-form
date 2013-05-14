define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./decorator.html",
		"dijit/Tooltip","./_DecoratorMixin","../_LayoutMixin", "dojo/dom-geometry", "dojo/dom-style"
], function(declare, lang, array, _WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template,Tooltip,_DecoratorMixin, _LayoutMixin, domGeometry, domStyle) {

	return declare("app.DecoratorWidget",[ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin,_DecoratorMixin, _LayoutMixin ], {
		constructor:function(config) {
			this.inherited(arguments);
			lang.mixin(this,config);
			this.label=this.meta && (this.meta.label || this.meta.code) || "";
		},
		startup: function() {
			this.inherited(arguments);
			if (this.meta && this.meta.visible == false) {
				this.domNode.style.display="none";
			}
		},
		getMinWidth: function() {
			// minWidth is the containerNode extents plus its child's margin width
			var cs = domStyle.getComputedStyle(this.containerNode);
			var me = domGeometry.getMarginExtents(this.containerNode, cs);
			var be = domGeometry.getBorderExtents(this.containerNode, cs);
			var pe = domGeometry.getPadExtents(this.containerNode, cs);
			var mb = domGeometry.getMarginBox(this.containerNode, cs);
			var minWidth =0;
			array.forEach(this.containerNode.childNodes, function(child) {
				if (child.nodeType==1) {
					var ccs = domStyle.getComputedStyle(child);
					var cmb = domGeometry.getMarginBox(child, ccs);
					var w=cmb.w+be.w+pe.w+me.w;
					if (w>minWidth) {
						minWidth=w;
					}	
				}
			},this); 
			return minWidth;
		},
		templateString : template,
	
	});

});
