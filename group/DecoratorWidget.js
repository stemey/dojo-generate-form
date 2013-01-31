define([ "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin","dijit/_CssStateMixin", "dojo/text!./decorator.html",
		"dijit/form/TextBox" ,//
		"../visit","dojo/on","dijit/Tooltip","dojox/mvc/at","./_GroupMixin"
], function(declare, lang,_WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,_CssStateMixin,
		template, TextBox, visit,on,Tooltip,at,_GroupMixin) {

	return declare("app.DecoratorWidget",[ _WidgetBase,_Container, _TemplatedMixin, _CssStateMixin,_WidgetsInTemplateMixin,_GroupMixin ], {
		templateString : template,
		baseClass:"Decorator",
		postCreate: function() {
			this.inherited(arguments);
			//on(this.domNode,"attrmodified-state", lang.hitch(this,"onStateChange"));
			//on(this.domNode,"attrmodified-message", lang.hitch(this,"onMessageChange"));
			if (this.modelHandle && typeof this.modelHandle.watch == "function") {
				//this.modelHandle.watch("valid",lang.hitch(this,"onValidChange"));
				this.modelHandle.watch("message",lang.hitch(this,"onMessageChange"));
				this.modelHandle.watch("value",lang.hitch(this,"onValueChange"));
			}else{
				console.log("modelHandle is null "+this.label);
			}
			new Tooltip({
		        connectId: [this.descriptionTooltipNode],
		        label: this.meta.description
		    });
			this.errorTooltip=new Tooltip({
		        connectId: [this.errorTooltipNode],
		        label: ""
		    });
			this.changesTooltip=new Tooltip({
		        connectId: [this.changesTooltipNode],
		        label: ""
		    });
			this.updateState();
			
			
		},
		startup: function() {
			this.inherited(arguments);
		},
		onStateChange: function(e) {
			//this.set("state",e.detail.newValue); 
		},
		onValueChange: function(a,old,nu) {
			this.changesTooltip.label="was "+this.modelHandle.oldValue
			this.updateState();
		},
		onValidChange: function(e) {
			this.updateState();
			this.inherited(arguments);
//			if (old!=nu) {
//				this.emit("valid-changed",{source:this});
//			}
		},
		isValidationContainer:true,
		updateState: function() {
			if (!this.modelHandle) {
				return;
			}
			if (this.modelHandle.valid) {
				if (this.modelHandle.oldValue!=this.modelHandle.value	) {
					this.set("state","Changed");
					this.changesTooltipNode.style.display="";
				}else{
					this.set("state","");
					this.changesTooltipNode.style.display="none";
				}
				this.errorTooltipNode.style.display="none";
			}else{
				this.changesTooltipNode.style.display="none";
				this.errorTooltipNode.style.display="";
					this.set("state","Error");
			}
		},	
		onMessageChange: function(a,old,nu) {
			this.errorTooltip.label=nu;
		}
	});

});
