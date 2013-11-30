define([    "dojo/_base/declare"
], function (declare) {
	// module:
	//		gform/layout/_InvisibleMixin


	return declare([], {
		//	summary:
		//		This LayoutContainer delegates resizing to a single child, assuming this widget should be invisible.
		isLayoutContainer: false,
		resize: function (dim) {
			if (!this.containerNode) {
				// make sure getChildren works.
				this.containerNode = this.domNode;
			}
			var child = this.getChildren()[0];
			if (dim) {
				child.resize({t: 0, l: 0, w: dim.w, h: dim.h});
			} else {
				child.resize();
			}
		}

	});

});
