define([
	"dijit/layout/ContentPane",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/dom-geometry"
], function (ContentPane, array, declare, domGeometry) {

	return declare([ ContentPane ], {
		_layoutChildren: function () {
			// All my child widgets are independently sized (rather than matching my size),
			// but I still need to call resize() on each child to make it layout.
            var cb = domGeometry.getContentBox(this.containerNode);
			array.forEach(this.getChildren(), function (widget) {
				if (widget.resize && widget._started) {
					widget.resize({w: cb.w, h: cb.h});
				}
			});
		}
	});

});
