define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		"dojo/dom-geometry", "dojo/dom-style" ], function(array, aspect,  lang,
		declare, domGeometry, domStyle) {
		// module: 
		//		gform/layout/_InvisibleMixin


	return declare( [], {
		//	summary:
		//		This LayoutContainer delegates resizing to a single child, assuming this widget should be invisible.
		isLayoutContainer:false,
		resize: function(dim) {
			if (!this.containerNode) {
				// make sure getChildren works.
				this.containerNode=this.domNode;
			}
			var child = this.getChildren()[0];
			if (dim) {
					child.resize({t:0,l:0,w:dim.w,h:dim.h});
			}else{
					child.resize();
			}
		}

	});
	
});
