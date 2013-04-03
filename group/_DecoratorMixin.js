define([ "dojo/_base/declare", "dojo/_base/lang",
		"dijit/Tooltip","./_GroupMixin","../hasChanged", "dojo/i18n", "dojo/i18n!../nls/messages"
], function(declare, lang,	Tooltip,_GroupMixin, hasChanged, i18n, messages) {

	return declare("..._DecoratorMixin",[ _GroupMixin ], {
		baseClass:"Decorator",
		isValidationContainer:true,
		
		messageWatch : null,
		valueWatch : null,
		
		postCreate: function() {
			this.inherited(arguments);
			if (this.modelHandle && typeof this.modelHandle.watch == "function") {
				this.messageWatch=this.modelHandle.watch("message",lang.hitch(this,"onMessageChange"));
				this.oldValueWatch=this.modelHandle.watch("oldValue",lang.hitch(this,"onOldValueChange"));
				this.valueWatch=this.modelHandle.watch("value",lang.hitch(this,"onModelValueChange"));
				this.on("value-changed",lang.hitch(this,"onValueChange"));
				this.on("valid-changed",lang.hitch(this,"onValidChange"));
			}else{
				console.log("modelHandle is null "+this.label);
			}
			if (this.descriptionTooltipNode) {
				if (this.meta.description) {
				new Tooltip({
				      connectId: [this.descriptionTooltipNode],
				      label: this.meta.description
				  });
				} else {
					this.descriptionTooltipNode.style.display="none";
				}
			}
			this.errorTooltip=new Tooltip({
		        connectId: [this.errorTooltipNode],
		        label: ""
		    });
			this.changesTooltip=new Tooltip({
		        connectId: [this.changesTooltipNode],
		        label: ""
		    });
			this.updateState();
			this.changesTooltip.label=this.getOldValueMessage(this.modelHandle.oldValue);
		},
		destroy: function() {
			this.inherited(arguments);
			if (this.modelHandle) {
				this.oldValueWatch.remove();
				this.messageWatch.remove();
				this.valueWatch.remove();
			}
		},

		startup: function() {
			this.inherited(arguments);
		},
		
		onValueChange: function(e) {
			if (e.src!=this) {
				this.updateState();
			}
		},
		
		onModelValueChange: function(propName,old,nu) {
			this.updateState();
			this.emit("value-changed",{src:this,oldValue:old,newValue:nu});
		},
		getOldValueMessage: function(old) {
			var message;
			if (old==null || typeof old == "undefined") {
				message = messages["oldValueWasNull"];
			} else {
				message = lang.replace(messages["oldValueChanged"],{oldValue:dojo.toJson(old,true)});
			}
			return message;
		},
		onOldValueChange: function(propName,old,nu) {
			this.changesTooltip.label=this.getOldValueMessage(old);
			this.updateState();
		},

		onValidChange: function(e	) {
			this.updateState();
		},
		
		updateState: function() {
			if (!this.modelHandle) {
				return;
			}
			if (this.modelHandle.state=="") {
				if (hasChanged(this.modelHandle)) {
					this.set("state","Changed");
					this.changesTooltipNode.style.display="";
				}else{
					this.set("state","");
					this.changesTooltipNode.style.display="none";
				}
				this.errorTooltipNode.style.display="none";
			}else if (this.modelHandle.state=="Error"){
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
