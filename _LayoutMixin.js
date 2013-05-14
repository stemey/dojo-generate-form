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
		if (dim) {
 				//console.log("resize "+this.id+ " "+dim.w);
				// calculate the width of this contentBox
				var cs = domStyle.getComputedStyle(this.domNode);
				var me = domGeometry.getMarginExtents(this.domNode, cs);
				var be = domGeometry.getBorderExtents(this.domNode, cs);
				var pe = domGeometry.getPadExtents(this.domNode, cs);
				var cb = domGeometry.getContentBox(this.domNode, cs);
				var width = dim.w 	- (me.w + be.w + pe.w);

				// assuming that the containerNode has a costant positioning reative to domNode we calculate this containerNode's new width.
				var ccs = domStyle.getComputedStyle(this.containerNode);
				var ccb = domGeometry.getContentBox(this.containerNode, ccs);
				var diff = cb.w-ccb.w;

				this.domNode.style.width=width+"px";
				var childWidth = width-diff;
				if (Math.floor(childWidth)<=0) {
					// if the containerNode does not have a size of its own then use our size.
					childWidth=width;
				}

			}else{
 				//console.log("resize "+this.id);
			}
			array.forEach(this.getChildren(),function(widget) {
				if (widget.resize) {
					if (dim) {
						console.log(" resisze child "+widget.id+"  "+childWidth);
						widget.resize({t:0,l:0,w: childWidth});
					} else {
						widget.resize();
					}
				}
			}, this);
		}

	});
	
});
