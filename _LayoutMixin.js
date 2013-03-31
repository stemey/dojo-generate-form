define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		"dojox/mvc/_Container", "dijit/layout/_LayoutWidget","dojox/mvc/at", 
		"dojo/dom-construct", "dojo/Stateful", "./getPlainValue","./updateModelHandle","./hasChanged","./group/_GroupMixin" ], function(array, aspect,  lang,
		declare, Container, _LayoutWidget,at, domConstruct,
		 Stateful,getPlainValue,updateModelHandle,hasChanged,_GroupMixin) {
		// module: 
		//		gform/Editor

	// at needs to be globally defined.
	window.at = at; 

	return declare("gform._LayoutMixin", [], {
		isLayoutContainer:true,
		resize: function(dim) {
			this.dim=dim;
			var widget = this.getChildren()[0];
			if (widget.resize) {
				if (dim) {
					widget.resize({t:0,l:0,w:dim.w,h:dim.h});
				} else {
					widget.resize();
				}
			}
		}

	});
	
});
