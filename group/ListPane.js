define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dijit/layout/ContentPane", "./_GroupMixin", "dojo/dom-geometry"
], function(declare, lang, array, ContentPane,_GroupMixin, domGeometry) {

	return declare("gform.ListPane",[ ContentPane,_GroupMixin ],{
	_layoutChildren: function(){
		// All my child widgets are independently sized (rather than matching my size),
		// but I still need to call resize() on each child to make it layout.
		var cb = domGeometry.getContentBox(this.containerNode);
		array.forEach(this.getChildren(), function(widget){
			if(widget.resize){
				console.log("listpane: "+cb.w);	
				widget.resize({w: cb.w});
			}
		});
	},
	});

});
