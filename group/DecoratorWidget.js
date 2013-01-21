define([ "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin","dijit/_CssStateMixin", "dojo/text!./decorator.html",
		"dijit/form/TextBox" ,//
		"../visit","dojo/on"
], function(declare, lang,_WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,_CssStateMixin,
		template, TextBox, visit,on) {

	return declare("app.DecoratorWidget",[ _WidgetBase,_Container, _TemplatedMixin, _CssStateMixin,_WidgetsInTemplateMixin ], {
		templateString : template,
		baseClass:"Decorator",
		postCreate: function() {
			on(this.domNode,"attrmodified-state", lang.hitch(this,"onStateChange"));
			this.modelHandle.watch("value",lang.hitch(this,"onValueChange"));
		},
		onStateChange: function(e) {
			this.set("state",e.detail.newValue); 
		},
		onValueChange: function(e) {
			this.set("changed",this.modelHandle.value!=this.modelHandle.oldValue);
			this.labelNode.toggleClass(this.get("changed"),"changed");
		},
		isValid: function() {
			var valid=true;
			visit(this.modelHandle, function(e){if (e.valid ==false) {valid=false;return false;} else return true;}		); 
		},
		getErroneousFieldCount: function() {
			var count=0;
			visit(this.modelHandle, function(e){if (e.valid ==false) {count++};return true;}); 
		}
	});

});
