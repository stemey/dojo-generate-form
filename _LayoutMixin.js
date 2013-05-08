define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		"dojo/dom-geometry", "dojo/dom-style" ], function(array, aspect,  lang,
		declare, domGeometry, domStyle) {
		// module: 
		//		gform/_LayoutMixin


	return declare("gform._LayoutMixin", [], {
		//	summary:
		//		This LayoutContainer notitifes nested LayoutContainers that they are being shown and need to layout
		//		Also it resizes the width of children if possible
		isLayoutContainer:true,
		resize: function(dim) {
			this.dim=dim;
			if (dim) {
				this.domNode.style.width=dim.w+"px";
				var id = this.meta ? this.meta.code : (this.attribute?this.attribute.code:this.id);
			}
			array.forEach(this.getChildren(),function(widget) {
				if (widget.resize) {
					if (dim) {
						if (this.domNode) {
							var cs = domStyle.getComputedStyle(this.domNode);
							var me = domGeometry.getMarginExtents(this.domNode, cs);
							var be = domGeometry.getBorderExtents(this.domNode, cs);
							var pe = domGeometry.getPadExtents(this.domNode, cs);
							var width = dim.w- 2*(me.w + be.w + pe.w);
							console.log("   "+this.id+" e "+dim.w+" "+width); 
							widget.resize({t:0,l:0,w: width});
						}else{
							widget.resize({t:0,l:0,w:dim.w});
						}
					} else {
						widget.resize();
					}
				}
			}, this);
		}

	});
	
});
