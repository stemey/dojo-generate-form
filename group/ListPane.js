define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dijit/layout/ContentPane", "./_GroupMixin"
], function(declare, lang, array, ContentPane,_GroupMixin) {

	return declare("gform.ListPane",[ ContentPane,_GroupMixin ],{
	_layoutChildren: function(){
		// All my child widgets are independently sized (rather than matching my size),
		// but I still need to call resize() on each child to make it layout.
		var cb = this._contentBox || domGeometry.getContentBox(this.containerNode);
		array.forEach(this.getChildren(), function(widget){
			if(widget.resize){
				widget.resize({w: cb.w-2*cb.l});
			}
		});
	},
	});

});
