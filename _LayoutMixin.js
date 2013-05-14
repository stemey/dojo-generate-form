define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		"dojo/dom-geometry", "dojo/dom-style" ], function(array, aspect,  lang,
		declare, domGeometry, domStyle) {
		// module: 
		//		gform/_LayoutMixin


	return declare("gform._LayoutMixin", [], {
		//	summary:
		//		This LayoutContainer notitifes nested LayoutContainers that they are being shown and need to layout
		//		Also it resizes the width of children to the width of its containerNode. 
		isLayoutContainer:true,
		resize: function(dim) {
			this.dim=dim;
			if (dim) {
				// calculate the width of this contentBox
				var cs = domStyle.getComputedStyle(this.domNode);
				var me = domGeometry.getMarginExtents(this.domNode, cs);
				var be = domGeometry.getBorderExtents(this.domNode, cs);
				var pe = domGeometry.getPadExtents(this.domNode, cs);
				var width = dim.w 	- (me.w + be.w + pe.w);

				// assuming that the containerNode has a costant positioning reative to domNode we calculate this containerNode's new width.
				var cb = domGeometry.getContentBox(this.domNode, cs);
				var ccb = domGeometry.getContentBox(this.containerNode, cs);
				var diff = ccb.l-cb.l + (cb.r - ccb.r)

				this.domNode.style.width=width+"px";
				var childWidth = width-diff;

			}
			array.forEach(this.getChildren(),function(widget) {
				if (widget.resize) {
					if (dim) {
						widget.resize({t:0,l:0,w: childWidth});
					} else {
						widget.resize();
					}
				}
			}, this);
		}

	});
	
});
