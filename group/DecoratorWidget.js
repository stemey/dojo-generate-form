define([ "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin","dijit/_CssStateMixin", "dojo/text!./decorator.html",
		"dijit/form/TextBox" ,//
		"../visit","dojo/on","dijit/Tooltip"
], function(declare, lang,_WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,_CssStateMixin,
		template, TextBox, visit,on,Tooltip) {

	return declare("app.DecoratorWidget",[ _WidgetBase,_Container, _TemplatedMixin, _CssStateMixin,_WidgetsInTemplateMixin ], {
		templateString : template,
		baseClass:"Decorator",
		postCreate: function() {
			//on(this.domNode,"attrmodified-state", lang.hitch(this,"onStateChange"));
			//on(this.domNode,"attrmodified-message", lang.hitch(this,"onMessageChange"));
			if (this.modelHandle && typeof this.modelHandle.watch == "function") {
				this.modelHandle.watch("valid",lang.hitch(this,"onValidChange"));
				this.modelHandle.watch("message",lang.hitch(this,"onMessageChange"));
				this.modelHandle.watch("value",lang.hitch(this,"onValueChange"));
			}else{
				console.log("modelHandle is null "+this.label);
			}
		},
		onStateChange: function(e) {
			//this.set("state",e.detail.newValue); 
		},
		onValueChange: function(a,old,nu) {
			this.updateState();
		},
		onValidChange: function(a,old,nu) {
			this.updateState();
		},
		updateState: function() {
			if (this.modelHandle.valid) {
				if (this.modelHandle.oldValue!=this.modelHandle.value	) {
					this.set("state","Changed");
				}else{
					this.set("state","");
				}
			}else{
					this.set("state","Error");
			}
		},	
		onMessageChange: function(a,old,nu) {
			this.messageNode.innerHTML=nu;
			this.displayTooltip(nu);
		},
		displayTooltip: function(text) {
			if(text){//&& this.focused){
				Tooltip.show(text, this.errorTooltip);//, this.tooltipPosition, !this.isLeftToRight());
			}else{
				Tooltip.hide(this.errorTooltip);
			}
		}
		,
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
