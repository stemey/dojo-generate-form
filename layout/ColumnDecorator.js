define([   "dojo/_base/declare", "dijit/_WidgetBase" ], function(declare, _WidgetBase) {

	return declare("gform.layout.ColumnDecorator", [_WidgetBase], {
		resize: function(dim) {
			this.domNode.style.width=dim.w;
			this.getChildren()[0].domNode.style.width=dim.w;
		}
	});
	
});
