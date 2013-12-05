define(["dojo/_base/declare",//
	"dojo/_base/array",//
	"dojox/mvc/WidgetList" ], function (declare, array, WidgetList) {
	// module:
	//		gform/LayoutWidgetList


	return declare([WidgetList], {
		//	summary:
		//		WidgetList with layouting. sets the children's width to its own.  
		isLayoutContainer: true,
		addChild: function () {
			// summary:
			//		layout this container if children are added.
			this.inherited(arguments);
			this.resize();
		},
		resize: function (dim) {
			//console.log("resize "+this.id);
			array.forEach(this.getChildren(), function (widget) {
				if (widget.resize) {
					if (dim) {
						widget.resize({t: 0, l: 0, w: dim.w});
					} else {
						widget.resize();
					}
				}
			}, this);
		}

	});

});
