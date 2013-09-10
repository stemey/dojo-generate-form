define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./SubView",//
"../Context",//
], function(array, lang, declare, SubView, Context) {

	return declare( [Context], {
		datePicker:null,
		viewStack:[],
		effect:"slide",
		heading:null,
		getDatePicker : function() {
			return this.datePicker;
		},
		createView: function() {
			var view = new SubView({ctx:this});
			var refNode= this.getCurrentView().domNode;
			refNode.parentNode.appendChild(view.domNode);
			view.startup();	
			return view;
		},
		setInitialView: function(view) {
			this.viewStack.push(view);
		},	
		getCurrentView: function() {
			return this.viewStack[this.viewStack.length-1];
		},
		transitionTo: function(view) {
			this.getCurrentView().performTransition(view.id, 1, this.effect);
			this.viewStack.push(view);
		},
		back: function() {
			var lastView = this.viewStack.pop();
			lastView.performTransition(this.getCurrentView().id, -1, this.effect);
		}
	});
})
