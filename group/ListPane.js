define([ "dojo/_base/declare", "dojo/_base/lang", "dijit/layout/ContentPane", "./_GroupMixin"
], function(declare, lang, ContentPane,_GroupMixin) {

	return declare("gform.ListPane",[ ContentPane,_GroupMixin ],{
			_checkIfSingleChild: function() {
				// the single child maybe a layoutContainer, but it will be _LayoutMixin which only propagates resize events. 
				this._singleChild=false;
			}
	});

});
