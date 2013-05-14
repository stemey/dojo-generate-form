define(["dojo/_base/declare",//
"dojo/_base/array",//
"dojox/mvc/WidgetList" ], function(declare, array, WidgetList) {
		// module: 
		//		gform/_LayoutMixin


	return declare( [WidgetList], {
		//	summary:
		//		This LayoutContainer notitifes nested LayoutContainers that they are being shown and need to layout
		//		Also it resizes the width of children to the width of its containerNode. 
		isLayoutContainer:true,
		addChild: function() {
			this.inherited(arguments);
			this.resize();
		},
		resize: function(dim) {
			//console.log("resize "+this.id);
			array.forEach(this.getChildren(),function(widget) {
				if (widget.resize) {
					if (dim) {
						widget.resize({t:0,l:0,w: dim.w});
					} else {
						widget.resize();
					}
				}
			}, this);
		}

	});
	
});
