define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mobile/TextBox",//
], function(array, lang, declare, aspect, TextBox) {

	return declare( [TextBox], {
		ctx:null,
		handles:[],	
		postCreate : function() {
			this.inherited(arguments);
			this.on("click", lang.hitch(this, "open"));
		},
   open: function (event) {
        // summary:
        //      Show DateOpener
				var dp = this.ctx.getDatePicker();
				this.handles.push(aspect.after(dp, "confirm", lang.hitch(this, "confirm")));
				this.handles.push(aspect.after(dp, "cancel", lang.hitch(this, "confirm")));
        dp.show(event);
    },
     confirm : function (event) {
          // summary:
          //  Done selecting new date
				var dp = this.ctx.getDatePicker();
				this.set("value", dp.getDate());
				dp.close();
        this.removeHandles();  
      },
      cancel : function (event) {
          // summary:
          //      Cancel date editing
				dp.close();
      },
			removeHandles: function() {
				array.forEach(this.handles, function(h) {
					h.remove();
				});
			}
		});
})
