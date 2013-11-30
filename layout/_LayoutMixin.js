define([ "dojo/_base/array", "dojo/_base/declare"
], function (array, declare) {
	// module:
	//		gform/layout/_LayoutMixin


	return declare("gform._LayoutMixin", [], {
		//	summary:
		//		This LayoutContainer notifies nested LayoutContainers that they are being shown and need to layout
		isLayoutContainer: false,
		resize: function () {
			array.forEach(this.getChildren(), function (widget) {
				if (widget.resize) {
					widget.resize();
				}
			}, this);
		}

	});

});
