define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		"dojox/mvc/_Container", "dijit/layout/_LayoutWidget","dojox/mvc/at", 
		"dojo/dom-construct", "dojo/Stateful", "./getPlainValue","./updateModelHandle","./hasChanged","./group/_GroupMixin" ], function(array, aspect,  lang,
		declare, Container, _LayoutWidget,at, domConstruct,
		 Stateful,getPlainValue,updateModelHandle,hasChanged,_GroupMixin) {
		// module: 
		//		gform/_LayoutMixin


	return declare("gform._LayoutMixin", [], {
		//	summary:
		//		This LayoutContainer notitifes nested LayoutContainers that they are being shown and need to layout.
		//		Also it resizes the width of children if possible.
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
						widget.resize({t:0,l:0,w:dim.w});
					} else {
						widget.resize();
					}
				}
			});
		}

	});
	
});
