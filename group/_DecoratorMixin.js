define([ "dojo/_base/declare", "dojo/_base/lang",
		"dijit/Tooltip","./_GroupMixin","../hasChanged"
], function(declare, lang,	Tooltip,_GroupMixin, hasChanged) {

	return declare("gform._DecoratorMixin",[ _GroupMixin ], {
		baseClass:"Decorator",
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
				new Tooltip({
				      connectId: [this.descriptionTooltipNode],
				      label: this.meta.description
				  });
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
			this.changesTooltip.label="was "+dojo.toJson(this.modelHandle.oldValue,true)
			
			
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
		onOldValueChange: function(propName,old,nu) {
			this.changesTooltip.label="was "+dojo.toJson(this.modelHandle.oldValue,true)
			this.updateState();
		},
		onValidChange: function(e	) {
			this.updateState();
		},
		isValidationContainer:true,
		updateState: function() {
			if (!this.modelHandle) {
				return;
			}
			if (this.modelHandle.valid) {
				if (hasChanged(this.modelHandle)) {
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
