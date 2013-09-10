define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dijit/_WidgetBase", //
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dojo/text!./DatePickerDialog.html",
"dojox/mobile/Heading",//
"dojox/mobile/ToolBarButton",//
"dojox/mobile/Opener",//
"dojox/mobile/DatePicker",//
], function(array, lang, declare, aspect, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

	return declare( [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		datePicker:null,
		opener:null,	
		templateString: template,
		startup: function() {
			this.inherited(arguments);	
		},
   show: function (event) {
        // summary:
        //      Show DateOpener
				this.opener.show(event.target, ['above-centered','below-centered','after','before']);
    },
			getDate: function() {
				return this.datePicker.get("value");
			},
     confirm : function (event) {
					console.log("confirm");
          // summary:
          //  Done selecting new date
      },
      cancel : function (event) {
					console.log("cancel");
          // summary:
          //      Cancel date editing
      },
			close: function() {
				this.opener.hide();
			}
		});
})
