define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		"dojo/dom-geometry", "dojo/dom-style" ], function(array, aspect,  lang,
		declare, domGeometry, domStyle) {
		// module: 
		//		gform/_LayoutMixin


	return declare("gform._LayoutMixin", [], {
		//	summary:
		//		This LayoutContainer notitifes nested LayoutContainers that they are being shown and need to layout
		isLayoutContainer:false,
		resize: function() {
			array.forEach(this.getChildren(),function(widget) {
				if (widget.resize) {
						widget.resize();
				}
			}, this);
		}

	});
	
});
